import React from "react";
import ModalWrapper from "../../app/common/modals/ModalWrapper";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Button, Label, Divider } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../app/common/modals/modalReducer";
import { signInWithEmail } from "./../../app/firestore/firebaseService";
import SocialLogin from "./SocialLogin";

export default function LoginForm() {
  const dispatch = useDispatch();

  return (
    <ModalWrapper size="mini" header="Sign in to ReVents">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .required("You must provide a valid email adress")
            .email(),
          password: Yup.string().required(),
        })}
        onSubmit={async (
          values,
          // use 'setSubmitting' from Formik to change the icon
          { setSubmitting, setErrors }
        ) => {
          try {
            // firebaseService
            await signInWithEmail(values);
            setSubmitting(false);
            dispatch(closeModal());
          } catch (error) {
            // 'setErrors' from Formik transfers the errors to the Form
            // we give the message a 'key'=auth to use it
            setErrors({ auth: error.message });
            setSubmitting(false);
            // console.log(error);
          }
        }}
      >
        {({ isSubmitting, isValid, dirty, errors }) => (
          <Form className="ui form">
            <MyTextInput
              autoComplete="off"
              name="email"
              placeholder="Email Adress"
            />
            <MyTextInput
              name="password"
              placeholder="Password"
              type="password"
              autoComplete="off"
            />
            {/* // Formik errors */}
            {errors.auth && (
              <Label
                basic
                color="red"
                style={{ marginBottom: 10 }}
                // content={errors.auth}
                content={"The login credentials are not correct"}
              />
            )}

            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type="submit"
              fluid
              size="large"
              color="teal"
              content="Login"
            />
            <Divider horizontal>Or</Divider>
            <SocialLogin />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
}
