import Navbar from "../components/Navbar";

//orderForm will be replaced when the form is ready
export default function CreateAnOrder({ orderForm }) {
  return (
    <div className="container">
      <Navbar />
      <h2>Initiate a new order</h2>
      <orderForm />
    </div>
  );
}
