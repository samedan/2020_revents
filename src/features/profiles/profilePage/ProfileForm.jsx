import React from "react";
import { Formik } from "formik";
import { Form, Button } from "semantic-ui-react";
import MyTextInput from "./../../../app/common/form/MyTextInput";
import MyTextArea from "./../../../app/common/form/MyTextArea";
import * as Yup from "yup";

export default function ProfileForm({ profile }) {
  return (
    <Formik
      initialValues={{
        displayName: profile.displayName,
        description: profile.description,
      }}
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
      })}
      onSubmit={(values) => console.log(values)}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className="ui form">
          <MyTextInput name="displayName" placeholder="Display Name" />
          <MyTextArea name="description" placeholder="Description" />
          <Button
            loading={isSubmitting}
            floated="right"
            disabled={isSubmitting || !isValid || !dirty}
            type="submit"
            size="large"
            positive
            content="Update profile"
          />
        </Form>
      )}
    </Formik>
  );
}
