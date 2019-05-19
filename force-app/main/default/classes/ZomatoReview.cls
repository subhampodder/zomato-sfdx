//container class for zomato reviews respomnse
public class ZomatoReview {

	public class User {
		public String name;
		public String foodie_level;
		public Integer foodie_level_num;
		public String foodie_color;
		public String profile_url;
		public String profile_image;
		public String profile_deeplink;
	}

	public Integer reviews_count;
	public Integer reviews_start;
	public Integer reviews_shown;
	public List<User_reviews> user_reviews;

	public class Review {
		public Integer rating;
		public String review_text;
		public Integer id;
		public String rating_color;
		public String review_time_friendly;
		public String rating_text;
		public Integer timestamp;
		public Integer likes;
		public User user;
		public Integer comments_count;
	}

	public class User_reviews {
		public Review review;
	}

	
	public static ZomatoReview parse(String json) {
		return (ZomatoReview) System.JSON.deserialize(json, ZomatoReview.class);
	}
}