import { POST } from "../utils/http";

const newsletterSubscribtionAPI = async ({ info, setIsSuccessfullySend }) => {
  try {
    const { response } = await POST("/api/newsletter", info);

    if (response.status === 200) {
      setIsSuccessfullySend(true);

      setTimeout(() => {
        setIsSuccessfullySend(false);
      }, 3000);
    }
    if (response.status === 500)
      alert("Server error, please try again");
  } catch (err) {
    console.log(err);
  }
};

export default newsletterSubscribtionAPI;
