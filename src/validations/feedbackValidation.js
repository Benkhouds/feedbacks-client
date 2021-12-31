import * as Yup from 'yup';

const feedbackSchema = Yup.object({
   feedbackTitle: Yup.string()
      .max(15, 'Feedback title should be less or equal to 12 characters')
      .required("Can't be empty"),
   details: Yup.string()
      .max(255, 'Feedback details should be less than 255 characters')
      .required("Can't be empty"),
});

export default feedbackSchema;
