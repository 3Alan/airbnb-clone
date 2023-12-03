export interface ListingItem {
  id: string;
  listing_url: string;
  scrape_id: string;
  last_scraped: string;
  name: string;
  summary: string | null;
  space: string | null;
  description: string;
  experiences_offered: string;
  neighborhood_overview: string | null;
  notes: string | null;
  transit: string | null;
  access: string | null;
  interaction: string | null;
  house_rules: string | null;
  thumbnail_url: string;
  medium_url: string;
  picture_url: {
    thumbnail: boolean;
    filename: string;
    format: string;
    width: number;
    mimetype: string;
    etag: string;
    id: string;
    last_synchronized: string;
    color_summary: string[];
    height: number;
  };
  xl_picture_url: string;
  host_id: string;
  host_url: string;
  host_name: string;
  host_since: string;
  host_location: string;
  host_about: string | null;
  host_response_time: string | null;
  host_response_rate: string | null;
  host_acceptance_rate: string | null;
  host_thumbnail_url: string;
  host_picture_url: string;
  host_neighbourhood: string;
  host_listings_count: number;
  host_total_listings_count: number;
  host_verifications: string[];
  street: string;
  neighbourhood: string;
  neighbourhood_cleansed: string;
  neighbourhood_group_cleansed: string | null;
  city: string;
  state: string;
  zipcode: string | null;
  market: string;
  smart_location: string;
  country_code: string;
  country: string;
  latitude: string;
  longitude: string;
  property_type: string;
  room_type: string;
  accommodates: number;
  bathrooms: number;
  bedrooms: number;
  beds: number;
  bed_type: string;
  amenities: string[];
  square_feet: number | null;
  price: number | null;
  weekly_price: number | null;
  monthly_price: number | null;
  security_deposit: number | null;
  cleaning_fee: number | null;
  guests_included: number;
  extra_people: number;
  minimum_nights: number;
  maximum_nights: number;
  calendar_updated: string;
  has_availability: boolean | null;
  availability_30: number;
  availability_60: number;
  availability_90: number;
  availability_365: number;
  calendar_last_scraped: string;
  number_of_reviews: number;
  first_review: string | null;
  last_review: string | null;
  review_scores_rating: number | null;
  review_scores_accuracy: number | null;
  review_scores_cleanliness: number | null;
  review_scores_checkin: number | null;
  review_scores_communication: number | null;
  review_scores_location: number | null;
  review_scores_value: number | null;
  license: string | null;
  jurisdiction_names: string | null;
  cancellation_policy: string;
  calculated_host_listings_count: number;
  reviews_per_month: number | null;
  geolocation: {
    lon: number;
    lat: number;
  };
  features: string[];
}
