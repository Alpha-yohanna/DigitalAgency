import "./App.css";
import Navbar from "./component/navBar";
import lady from "../src/images/lady3.png";
import arrow from "../src/images/arrow.svg";
import Activity from "../src/images/Activity.svg";
import Heart from "../src/images/Heart.png";
import Work from "../src/images/Work.png";
import project from "../src/images/project.png";
import rating from "../src/images/rating.png";
import raise from "../src/images/raise.png";
import time from "../src/images/time.png";
import digital from "../src/images/digital.png";
import digital2 from "../src/images/digital2.png";
import digital3 from "../src/images/digital3.png";
import digital4 from "../src/images/digital4.png";
import Carousel from "./component/carousel";
import SearchInput from "../src/component/searchInput";
import Footer from "../src/component/footer";
import Scroll from "./component/scrollLogos";
import ContactForm from "./component/contactForm";
import AdminDashboard from "./pages/AdminDashboard";


function App() {
  if (
    window.location.pathname.endsWith("/admin") ||
    window.location.hash === "#/admin"
  ) {
    return <AdminDashboard />;
  }

  const services = [
    {
      icon: Activity,
      title: "Grow Your Business",
      text: "We help identify the best ways to improve your business.",
    },
    {
      icon: Heart,
      title: "Improve Brand Loyalty",
      text: "We help you build stronger relationships with your customers.",
    },
    {
      icon: Work,
      title: "Improve Business Model",
      text: "We shape better strategies for sustainable business growth.",
    },
  ];

  const stats = [
    { icon: project, label: "Completed projects", value: "100 +" },
    { icon: rating, label: "Customer Satisfaction", value: "20 %" },
    { icon: raise, label: "Raised by Clients", value: "$10M" },
    { icon: time, label: "Years in Business", value: "2 yrs" },
  ];

  const portfolio = [digital2, digital3, digital4, digital];

  return (
    <div className="App bg-white text-black">
      <Navbar />

      <section className="bg-green-100 px-6 pt-24">
        <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-2">
          <div className="mx-auto max-w-xl text-center md:mx-0 md:text-left">
          <p className="text-3xl font-bold font-Poppins text-black sm:text-4xl lg:text-5xl">
            Increase Your
            <br />
            Customers Loyalty
            <br />
            and Satisfaction
            <br />
          </p>
          <p className="mt-4 text-base font-normal leading-7 text-black font-Avenir">
            We help businesses like yours earn more customers,
            stand out from competitors, and make more money.
          </p>

          <a href="#contact" className="mt-6 inline-block rounded-lg border border-1 border-green-600 bg-green-600 px-5 py-3 text-white custom-link-style">
            Get Started
          </a>
        </div>
          <img
            src={lady}
            alt="lady with laptop"
            className="mx-auto w-full max-w-[560px]"
          />
        </div>
      </section>

      <div className=" mt-4 mb-4">
        <Scroll />
      </div>
      <div className="h-6 bg-green-100"></div>

      <section id="about" className="mx-auto max-w-6xl px-6 py-16 text-center md:text-left">
        <p className="text-sm font-medium uppercase text-green-600">
          what we do
        </p>
        <h2 className="mt-4 font-Poppins text-3xl font-bold text-black">
          We provide the Perfect Solution
          <br />
          to your business growth
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {services.map((service) => (
            <article className="mx-auto max-w-sm text-center md:text-left" key={service.title}>
              <img className="mx-auto mb-4 h-16 md:mx-0" src={service.icon} alt="" />
              <h3 className="font-bold">{service.title}</h3>
              <p className="mt-4 font-Poppins leading-6 text-gray-700">{service.text}</p>
              <a href="#contact" className="mt-6 inline-flex items-center justify-center font-medium">
                Learn More <img className="ml-2 h-3" src={arrow} alt="" />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-12">
        <div className="mx-auto grid max-w-6xl gap-6 text-center sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div className="flex flex-col items-center" key={stat.label}>
              <img className="h-16" src={stat.icon} alt="" />
              <p className="mt-4">{stat.label}</p>
              <p className="mt-2 text-xl font-bold text-green-600">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 text-center md:text-left">
        <p className="text-sm font-medium uppercase text-green-600">
          our portfolio
        </p>
        <h2 className="mt-4 font-Poppins text-3xl font-bold text-black">
          We provide the Perfect Solution
          <br />
          to your business growth
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {portfolio.map((image, index) => (
            <article className="mx-auto max-w-xl text-center md:text-left" key={image}>
              <img src={image} alt={`portfolio ${index + 1}`} className="mx-auto w-full rounded-lg md:mx-0" />
              <h3 className="mt-5 font-Poppins font-bold text-black">
                Digital Marketing Agency Website
              </h3>
              <p className="mt-3 font-Poppins leading-7 text-gray-700">
                This is a website for a client who wants to achieve their goals
                and meet their users' needs while also increasing their reach
                across all platforms.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-6 py-16 text-center md:text-left">
        <div className="mx-auto max-w-6xl">
        <p className="text-sm font-medium uppercase text-green-600">
          testimonials
        </p>
        <h2 className="mt-4 font-Poppins text-3xl font-bold text-black">
          See What Our Customer
          <br />
          Say About Us
        </h2>
        <div className="mt-10">
          <Carousel />
        </div>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-3xl">
          <h4 className="text-center text-green-600">SUBSCRIBE</h4>
          <p className="text-center font-bold">
            Subscribe to get the latest
            <br />
            news about us
          </p>
          <br />
          <p className="text-center -mt-5 text-[#8B8B8B] text-sm">
            Please drop your email below to get daily update about what we do
          </p>
          <div className="flex justify-center items-center mt-3">
            <SearchInput />
          </div>
        </div>
      </section>
        <ContactForm />
        <div className="mt-12">
          <Footer />
        </div>
    </div>
  );
}

export default App;
