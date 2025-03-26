





import React, { useEffect, useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./Reviews.css";





const Reviews = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [search, setSearch] = useState("");
    const [prevButton, setPrevButton] = useState(false);
    const [nextButton, setNextButton] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 5; // Adjust per need

    const [formData, setFormData] = useState({
        title: "",
        review: "",
        username: "",
        email: "",
    });

    // Load reviews from localStorage
    useEffect(() => {
        const userSavedReviews = localStorage.getItem("reviews");
        if (userSavedReviews) {
            setReviews(JSON.parse(userSavedReviews));
        }
    }, []);

    // Toggle form visibility
    const toggleForm = () => {
        setIsOpen(!isOpen);
    };



    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };



    // Handle star rating
    const handleRating = (index) => {
        setRating(index);
    };


 
    const userReviewSubmit = async (e) => {
        e.preventDefault();

        if (!formData.username || !formData.title || !formData.review || !formData.email) {
            alert("All fields are required!");
            return;
        }

        const newReview = {
            id: Date.now(),
            title: formData.title,
            review: formData.review,
            username: formData.username,
            email: formData.email,
            rating: rating,
        };

        try {
            const response = await fetch("https://dogstoreserver.onrender.com/reviews/user-reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newReview),
            });

            const data = await response.json();
            if (!response.ok) {
                alert(data.message);
                return;
            }

            const updatedReviews = [data.review, ...reviews];
            setReviews(updatedReviews);
            localStorage.setItem("reviews", JSON.stringify(updatedReviews));

            setFormData({ title: "", review: "", username: "", email: "" });
            setRating(0);
            setIsOpen(false);
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong, please try again.");
        }
    };




    // Filtered reviews based on search input
    const filteredReviews = useMemo(() => {
        return reviews.filter((data) => data.username.toLowerCase().includes(search.toLowerCase()));
    }, [reviews, search]);



    // Pagination Logic
    const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);



    const paginatedReviews = useMemo(() => {
        const startIndex = (currentPage - 1) * reviewsPerPage;
        return filteredReviews.slice(startIndex, startIndex + reviewsPerPage);
    }, [filteredReviews, currentPage, reviewsPerPage]);




    // Handle page navigation
    const goToPreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };




    const goToNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };




    useEffect(() => {
        setPrevButton(currentPage > 1);
        setNextButton(currentPage < totalPages);
    }, [currentPage, totalPages]);




    return (
        <>
            <div className="review-container">
                <div className="review-wrapper">
                    <div className="review-btn">
                    <button onClick={toggleForm}>✏️ Write a Review </button>
                    </div>

                    {/* Review Form */}
                    {isOpen && (
                        <form onSubmit={userReviewSubmit} className="form-wrapper">
                            <div className="left-side-review-wrapper">
                                <h3>WRITE A REVIEW</h3>
                                <div className="score"><p><span className="asterisk">*</span> Score</p></div>
                                <div className="review-stars">
                                    {[1, 2, 3, 4, 5].map((index) => (
                                        <span key={index}
                                            onMouseEnter={() => setHover(index)}
                                            onMouseLeave={() => setHover(0)}
                                            onClick={() => handleRating(index)}
                                            style={{
                                                fontSize: "20px",
                                                cursor: "pointer",
                                                color: index <= (hover || rating) ? "green" : "gray",
                                            }}> ★ </span>
                                    ))}
                                </div>

                                <div className="score"><h3><span className="asterisk">*</span> Title</h3></div>
                                <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
                                 <div className="score"><h3><span className="asterisk">*</span> Review</h3></div>
                                <textarea name="review" placeholder="Review" value={formData.review} onChange={handleChange} required />
                            </div>

                            <div className="right-side-review-wrapper">

                                Username:<input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
                                Email: <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                            </div>
                            <button type="submit">Post</button>
                        </form>
                    )}


                    {/* Search Bar */}
                    <div className="user-review-search">
                        <input onChange={(e) => setSearch(e.target.value)} type="text"
                         placeholder="Search by username..." value={search} />
                    </div>


                    {/* Display Reviews */}
                    {paginatedReviews.map((review) => (
                        <div key={review.id} className="post-review-wrapper">
                            <div className="post-review-section">
                                <div className="review-section">
                                    <div className="review-section-box">
                                        <div className="avatar-username-wrapper">
                                            <div className="avatar">{review.username.charAt(0).toUpperCase()}</div>
                                            <p>{review.username}</p>
                                        </div>
                                    </div>

                                    <h3>{review.title}</h3>
                                    <p>{review.review}</p>
                                    <div>
                                        {[...Array(review.rating)].map((_, index) => (
                                            <span key={index} style={{ color: "green", fontSize: "20px" }}>★</span>
                                        ))}
                                    </div>
                                </div>


                            </div>
                        </div>
                    ))}



                    {/* Pagination */}
                    <div className="pagination">
                        <button onClick={goToPreviousPage} disabled={!prevButton}>  <ChevronLeft size={13} /> Prev </button>
                        <span> Page {currentPage} of {totalPages} </span>
                        <button onClick={goToNextPage} disabled={!nextButton}>  Next <ChevronRight size={13} /> </button>
                    </div>



                </div>
            </div>
        </>
    );
};




export default Reviews;