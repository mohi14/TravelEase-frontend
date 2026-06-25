import Logo from "@/assets/icons/Logo";
import {
  MapPin,
  Phone,
  Mail,
//   Facebook,
//   Instagram,
//   Twitter,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="border-t bg-background ">
      <div className="mx-auto max-w-7xl px-4 pt-12">
        {/* Main Footer Content */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex gap-2 items-center">
                <Logo/>
                <h2 className="text-2xl font-bold">TravelEase</h2>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Discover amazing destinations, book unforgettable tours,
              and create memories that last a lifetime.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-primary">
                  Home
                </a>
              </li>
              <li>
                <a href="/tours" className="hover:text-primary">
                  Tours
                </a>
              </li>
              <li>
                <a href="/destinations" className="hover:text-primary">
                  Destinations
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-primary">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Popular Tours */}
          <div>
            <h3 className="mb-4 font-semibold">Popular Tours</h3>
            <ul className="space-y-2 text-sm">
              <li>Mountain Adventures</li>
              <li>Beach Escapes</li>
              <li>City Tours</li>
              <li>Historical Trips</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-semibold">Contact Us</h3>

            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4" />
                <span>123 Travel Street, Munich, Germany</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+49 123 456 789</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@travelease.com</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="mt-5 flex gap-3">
  <a
    href="#"
    className="rounded-full border p-2 transition hover:bg-muted"
  >
    <FaFacebookF size={16} />
  </a>

  <a
    href="#"
    className="rounded-full border p-2 transition hover:bg-muted"
  >
    <FaInstagram size={16} />
  </a>

  <a
    href="#"
    className="rounded-full border p-2 transition hover:bg-muted"
  >
    <FaXTwitter size={16} />
  </a>
</div>
          </div>
        </div>

        
      </div>
      {/* Bottom Section */}
        <div className="mt-10 border-t  py-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} TravelEase. All rights reserved.
        </div>
    </footer>
  );
}