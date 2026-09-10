export interface Review {
  name: string;
  detail: string;
  avatar: string;
  rating: number;
  text: string;
}

export const reviews: Review[] = [
  {
    name: "Sarah Mitchell",
    detail: "The Oak A-Frame · 2 nights",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80",
    rating: 5,
    text: "The moment we walked in, the world disappeared. Floor-to-ceiling windows, the fireplace crackling, nothing but trees and silence. We didn't want to leave.",
  },
  {
    name: "James & Emily Chen",
    detail: "The Ember A-Frame · 4 nights",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80",
    rating: 5,
    text: "Our kids still talk about the fire pit under the stars. The A-frame felt like a treehouse for grown-ups. We're already planning our return.",
  },
  {
    name: "Olivia Ramirez",
    detail: "The Pine A-Frame · 3 nights",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80",
    rating: 5,
    text: "I came to disconnect. The soaking tub, the mountain views, the absolute quiet — this place gave me exactly what I needed. Pure magic.",
  },
  {
    name: "Michael & Anna Weber",
    detail: "The Oak A-Frame · 3 nights",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&q=80",
    rating: 5,
    text: "For our anniversary, we wanted something special. The vaulted ceilings, the golden hour light pouring through the glass — it was like living inside a photograph.",
  },
];
