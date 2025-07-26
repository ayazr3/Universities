import { useState } from "react";
import { CiUser, CiSearch } from "react-icons/ci";
import { RiBook3Fill } from "react-icons/ri";
import { Link } from "@inertiajs/react";
import "./navba.css";

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
          href="#"
          onClick={() => setMenuOpen(false)}
          className={window.location.pathname === "/chatAi" ? "active" : ""}
        >
          شات الذكاء الاصطناعي
        </Link>
        <Link
          href="#"
          onClick={() => {
            topScroll();
            setMenuOpen(false);
          }}
          className={window.location.pathname === "/Selectionprocess" ? "active" : ""}
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
        <span>دليل البكلوريا</span>
        <RiBook3Fill />
      </div>
    </div>
  );
};

export default Navbar;
