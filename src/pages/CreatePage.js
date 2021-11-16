import {
  Layout,
  FormLayout,
  BackButton,
  AddIcon,
  FormTitle,
  FormControl,
  Label,
  ButtonsGroup,
  FormButton,
  TextArea,
  Dropdown,
  Button,
} from "../components";
import { useState, useContext } from "react";
import { DataService } from "../services";
import UserContext from "../context/user-context";

function CreatePage({ history }) {

  const [feedbackTitle, setFeedbackTitle] = useState("");
  const [category, setCategory] = useState("Feature");
  const [details, setDetails] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {user} = useContext(UserContext)

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("un");
    setIsLoading(true);
    console.log(user.accessToken)
    try {
      const { data } = await DataService.addFeedback(
        feedbackTitle,
        category.toLowerCase(),
        details,
        user.accessToken
      );
      if (data.success) {
        setTimeout(() => {
          history.push("/");
        }, 500);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Error occurred, please try again");
      setIsLoading(false);
      console.log(err);
    }
  }

  return (
    <Layout>
      <div className="w-1/3 mx-auto">
        <BackButton className="mb-8"/>
        <FormLayout onSubmit={handleSubmit}>
          <AddIcon />
          <FormTitle text="Create New Feedback" />
          {error && <span className="error-message">{error}</span>}
          <FormControl
            id="title"
            title="Feedback Title"
            subtitle="Add a short, description headline"
            type="text"
            value={feedbackTitle}
            onChange={(e) => setFeedbackTitle(e.target.value)}
          />

          <FormControl>
            <Label
              id="category"
              title="Category"
              subtitle="Choose a category for your feedback"
            />
            <Dropdown
              onChange={setCategory}
              value={category}
              options={["Feature", "UI", "UX", "Enhancement", "Bug"]}
            />
          </FormControl>

          <FormControl>
            <Label
              title="Feedback Detail"
              subtitle="Include any specific comments on what should be improved, added,
            etc."
              id="details"
            />
            <TextArea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </FormControl>

          <ButtonsGroup>
            <Button
              text="Cancel"
              className="bg-indigo-200 "
              onClick={() => {
                history.push("/");
              }}
            />
            <FormButton className="bg-gray-800 hover:bg-gray-600 flex items-center">
              {isLoading ? (
                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-50 mr-2"></span>
              ) : (
                <span className="rounded-full w-5 border-gray-50 mr-2 font-semibold">
                  +
                </span>
              )}
              Add Feedback
            </FormButton>
          </ButtonsGroup>
        </FormLayout>
      </div>
    </Layout>
  );
}

export default CreatePage;
