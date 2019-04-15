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

  - now we can jump back up to the mechanic and run the tests

