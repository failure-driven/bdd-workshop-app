# BDD new feature

- Let's review the main "flow" through the app
- going to the browser http://localhost:3000/
- the flow is `spec/xxx_features/flows/user_play_the_game_spec.rb`
  - click to play game
  - find ourselves on the `/register` path
  - input a handle "princess" click next
  - input an email "selenawiththetattoo@gmail.com" click next
  - see the "updated user successfully banner"
  - and find ours selves on the `/game` page with coming soon
  - we now click detail Profile in top right
  - shows us the `/profie` with avatar, handle and email
  - this is where we want to show a name as well!
  - so we can add a failing spec to show name
  - in `spec/xxx_features/flows/user_play_the_game_spec.rb` line 41
    we add name: 'Selena Small'

        wait_for { focus_on(:profile).details }.to eq(
          avatar: '',
          handle: 'princess',
          email: 'princess@email.com',
          name: 'Selena Small'
        )

  - so in actual fact we need to be able to fill it in as part of user signs up 
    LINE 17

        focus_on(:form).form_for('profile').fill_in_row_for('name', 'Selena Small')
        focus_on(:form).form_for('profile').submit

  - as this is new functionality that will fail we make it pending
    pending "no name field at the moment"
  - we can now run the spec
    `rspec spec/xxx_features/flows/user_play_the_game_spec.rb:5`
  - and we get a pending spec, an expected failure as it is marked pending
  - Now we jump down a layer to the Mechanic
  - the Mechanic responsible for this is
    `spec/xxx_features/mechanics/profiles/manage_profiles_spec.rb`
    on line 65 we can add details for name

        pending 'no name field'
        focus_on(:form).form_for('profile').fill_in_row_for('name', 'The Princess')

    and

      Then 'all the fields are prepended with a "The_"' do
        wait_for { focus_on(:profile).details }.to eq(
        ...
          name: 'The Princess'
        )
      end

  - running the mechanic with the pending also returns a pending spec
  - we now have a pending flow and mechanic
  - now we have the flow covered off and the mechanics of the edit let's jump down to the comonent
  - our form can be found in `app/javascript/components/OurForm/RegisterForm/index.jsx`
  - we need to start our jest tests with `yarn test-watch`
  - we probably want to filter on `w` to turn on watch usage
    `p` to filter by file name and type `RegisterForm`
    now only those tests run
  - Now it is time to change the component test and add a name field
    on line 39 of `app/javascript/components/OurForm/RegisterForm/index.test.jsx`

          it('Renders the name with label and placeholder', () => {
            const wrapper = shallow(<RegisterForm step="name" />);
            expect(wrapper.find('StepFormGroup')).toMatchInlineSnapshot(`
        <StepFormGroup
          label="Name"
          placeholder="input your name"
          step="name"
        />
        `);
          });

  - we watch the test fail
  - finally we can implement something
    in `app/javascript/components/OurForm/RegisterForm/index.jsx`

        {props.step === 'name' && (
        <StepFormGroup
          {...props}
          step="name"
          label="Name"
          placeholder="input your name"
        />
      )}

  - now we can update the default form on line 5 of
    `app/javascript/components/OurForm/RegisterForm/index.test.jsx`
    by adding

      <StepFormGroup
        label="Name"
        placeholder="input your name"
        step="name"
      />

  - on the code side on line 49 of RegisterForm/index.jsx

         <StepFormGroup
            {...props}
            step="name"
            label="Name"
            placeholder="input your name"
          />
        </>

  - once we have a passing test we can take a look in the browser to see we
    have a form field for name
    http://localhost:3000/profile
  - also our mechanic should pass a little bit more
    rspec spec/xxx_features/mechanics/profiles/manage_profiles_spec.rb:65
  - the form can now be filled in so we can move the pending in
    `spec/xxx_features/mechanics/profiles/manage_profiles_spec.rb`
    to line 76 just above the assertion of the details
  - unfortunately at this stage entering text into the field shows an error in
    the console about a comopnent changing an uncontrolled field, we need to
    configure our form to take control of that field in our form library Formik
  - Formik is configured in /app/javascript/components/OurForm/index.test.jsx
    where email and handle are configured on line 12 in inline snapshot. lets
    add name as well
    "name": "" on line 18
  - `w` and `t` in our jest watch to filter on `OurForm` we now have a failure
    which we can implement on line 10 of OurForm/index.jsx
  - the jest tests now pass but in that file we can see that this should really
    come from the profie which comes from the api via the serializer
  - for the moment we can just add it to the default props and we need to add
    name to the props

        urForm.defaultProps = {
          profile: { handle: '', email: '', name: '' },
        };

          email: PropTypes.string,
          name: PropTypes.string,
        }),

  - although we need this for prop types convention it still does not get rid
    of the error in the window as our api does not return a name
  - for that we need to add an API acceptace spec
    `spec/api_acceptance/v1/profile_api_spec.rb`

        @player = Player.create!(
          ...
          name: 'The Princess'

      it 'returns 200 OK' do
        ...
        expect(JSON.parse(response.body)).to include(
          ...
          'name' => 'The Princess'
    
  - running this
    `rspec spec/api_acceptance/v1/profile_api_spec.rb` fails as we do not have a name field

            ActiveModel::UnknownAttributeError:
                   unknown attribute 'name' for Player.

  - we can now skip controller and model tests and create a migration to add
    the name to the mode Player
    `rails generate migration AddNameToPlayer name:string`

  - bin/rails db:migrate

  - running this again gives us a new error that it is not returned
    `rspec spec/api_acceptance/v1/profile_api_spec.rb`

  - we can now jump into the controller spec

    `/spec/controllers/api/v1/profiles_controller_spec.rb` line 21 we need it

    to return a name

            expect(
          JSON.parse(response.body)
        ).to eq(
          'id' => '01234567-0123-4abc-8abc-0123456789ab',
          'handle' => 'the-handle',
          'email' => '',
          'name' => ''
        )

    running this we get a failure 
    `rspec spec/controllers/api/v1/profiles_controller_spec.rb:22`
  - now for this to be serialized we need to update the serializer
    app/views/api/v1/profiles/show.json.jbuilder

        json.handle @player.handle
        json.email @player.email
        json.name @player.name

  - moving back up to the controller it passes
    `rspec spec/controllers/api/v1/profiles_controller_spec.rb`
  - and back to the api acceptance
    `rspec spec/api_acceptance/v1/profile_api_spec.rb`
    that also passes
  - now up to the mechanic
    `rspec spec/xxx_features/mechanics/profiles/manage_profiles_spec.rb`
  - and although it fails still in the same spot, mostly because we cannot display it?
  - back into the frontend we find `app/javascript/components/Profile/ShowProfile/index.test.jsx`
    and add name to the show profile
  - 
