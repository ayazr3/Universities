import { useState } from "react";
import { CiUser, CiSearch } from "react-icons/ci";
import { RiBook3Fill } from "react-icons/ri";
import { Link } from "@inertiajs/react";
import "./navba.css";
import logo from "./img/logo.webp";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const topScroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // يمكن اضافة منطق البحث هنا
  };

  return (
    <div className="navBar">
      <div className="left_side">
        <Link href={route("login")} className="login_link">
          <span>
            تسجيل الدخول
            <CiUser />
          </span>
        </Link>
        <form className="search_form" onSubmit={handleSearch}>
          <input
            type="text"
            className="search_input"
            placeholder="ابحث هنا..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="search_button" aria-label="بحث">
            <CiSearch />
          </button>
        </form>
      </div>

      <button
        className="menu_toggle"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        &#9776;
      </button>

      <div className={`center_side ${menuOpen ? "open" : ""}`}>
        <Link
          href="/"
          onClick={() => {
            topScroll();
            setMenuOpen(false);
          }}
          className={window.location.pathname === "/" ? "active" : ""}
        >
          الرئيسية
        </Link>
      
<Link href={route('guidance.indexUser')} className={window.location.pathname === "/guidance" ? "active" : ""}>
   التوجيه والدعم
</Link>


        <Link
          href={route('faq.indexUser')}  // استخدم اسم الراوت الذي عرّفته
          className={window.location.pathname === "/questions" ? "active" : ""}
          onClick={() => {
            topScroll();
            setMenuOpen(false);
          }}
        >
           الاسئلة الشائعة
        </Link>
<Link
  href={route('chat.ai')}   // استخدام اسم الراوت من لارافيل
  onClick={() => setMenuOpen(false)}
  className={window.location.pathname === "/chat-ai" ? "active" : ""}
>
  شات الذكاء الاصطناعي
</Link>


              <Link
            href={route('university.selection')}  // استدعي الراوت الذي أنشأناه سابقا
            className={window.location.pathname === "/university-selection" ? "active" : ""}
            onClick={() => {
              topScroll();
              setMenuOpen(false);
            }}
          >
            المفاضلة
          </Link>

        <Link
          href={route("login")}
          className="login_list_link"
          onClick={() => setMenuOpen(false)}
        >
          <span>
            تسجيل الدخول <CiUser />
          </span>
        </Link>
      </div>

      <div className="N_right_side">
        <span>طريقك للجامعة </span>
       <img
  src={logo}
  alt="طريقك للجامعة  "
  style={{  
      width: "62px",           // يمكنك تغيير الحجم كما تريد
    height: "62px",
    borderRadius: "50%",     // تجعل الصورة دائرية
    objectFit: "cover",      // تغطي الحواف بشكل مثالي
    marginRight: "8px"}} // يمكنك تعديل الحجم أو النمط
/>

      </div>
    </div>
  );
};

export default Navbar;
