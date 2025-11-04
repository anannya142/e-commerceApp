
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Rating from "./Rating"; // optional, if you want to show stars under each review

const Reviews = ({ productId }) => {
  const { addReview, products } = useContext(ShopContext);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  // Load reviews whenever product updates in context
  useEffect(() => {
    const product = products.find((p) => p._id === productId);
    setReviews(product?.reviews || []);
  }, [products, productId]);

  //Handle review submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        setMessage("You must be logged in to add a review.");
        return;
      }

      const reviewData = {
        userId: user._id,
        rating,
        comment,
      };

      const response = await addReview(productId, reviewData);

      if (response.message === "Product already reviewed") {
        setMessage("You have already reviewed this product.");
      } else if (response.success) {
        setMessage("Review added successfully!");
        setRating("");
        setComment("");
      } else {
        setMessage(response.message || "Failed to add review.");
      }
    } catch (error) {
      console.error("Error adding review:", error);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="review-form flex flex-col gap-4 border px-6 py-6 text-sm text-gray-700">
      <h3 className="text-lg font-semibold mb-2">Customer Reviews</h3>

      {/* Display message */}
      {message && (
        <p
          className={`${
            message.includes("successfully")
              ? "text-green-600"
              : message.includes("already")
              ? "text-orange-500"
              : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}

      {/* Display all reviews */}
      <div className="flex flex-col gap-3">
        {reviews.length > 0 ? (
          reviews.map((rev, index) => (
            <div
              key={index}
              className="border-b pb-2 flex flex-col gap-1 text-sm"
            >
              <p className="font-semibold">{rev.user?.name || "Anonymous"}</p>
              <Rating value={rev.rating} />
              <p>{rev.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">No reviews yet. Be the first!</p>
        )}
      </div>

      {/* Review Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 mt-4 border-t pt-4"
      >
        <textarea
          className="border rounded-md p-2 w-full"
          placeholder="Write your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <input
          className="border rounded-md p-2 w-full"
          type="number"
          min="1"
          max="5"
          step="0.5" 
          placeholder="Rating (1–5)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
          // className="cosmic-button"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default Reviews;
