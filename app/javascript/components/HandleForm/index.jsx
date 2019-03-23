import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

const HandleForm = () => (
  <>
    <Form>
      <FormGroup>
        <Label for="exampleEmail">Handle</Label>
        <Input type="text" name="handle" placeholder="input a custom handle" />
      </FormGroup>
    </Form>
    <Button name="submit" color="primary" disabled>
      Next
    </Button>
  </>
);
export default HandleForm;
