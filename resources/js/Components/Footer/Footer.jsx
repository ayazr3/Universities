import React from "react";
import { MdMessage } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";
import { FaInstagram } from "react-icons/fa6";
import { Link } from "@inertiajs/react";
import "./Footer.css";

const Footer = ({ quickLinks = [] }) => {
    const topScroll = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    return (
        <div className="F_container">
            <div className="Sictions">
                {/* دليل البكلوريا */}
                <div className="F_right">
                    <h1>طريقك للجامعة </h1>
                    <p>
                        منصة الكترونية مخصصة في مساعدة طلاب البكلوريا على اختيار
                        المسار الجامعي المناسب وتقديم المساعدة و الدعم للطلاب
                    </p>
                    <div>
                        <ul>
                            <li>
                                <FaFacebookF />
                            </li>
                            <li>
                                <FaInstagram />
                            </li>
                            <li>
                                <FaXTwitter />
                            </li>
                            <li>
                                <TbWorld />
                            </li>
                        </ul>
                    </div>
                </div>
                {/* روابط سريعة */}
                <div className="F_center">
                    <h1>روابط سريعة</h1>
                    <ul>
                        {quickLinks.length > 0 ? (
                            quickLinks.map((link) => (
                                <li key={link.id}>
                                    <a
                                        href={link.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {link.entity_name}
                                    </a>
                                </li>
                            ))
                        ) : (
                            <>
                                <li>التخصصات الجامعية</li>
                                <li>الجامعات</li>
                                <li>دليل الطالب</li>
                                <li>مشروع التخرج</li>
                                <li>الاخبار و المستجدات</li>
                                <li>الاسئلة الشائعة</li>
                            </>
                        )}
                    </ul>
                </div>
                {/* اتصل بنا */}
                <div className="F_left">
                    <h1>اتصل بنا</h1>
                    <ul>
                        <li>
                            <a href="mailto:ammar@gamil.com">
                                ratebaltoum@gamil.com
                            </a>{" "}
                            <MdMessage />
                        </li>
                          <li>
                            0992086261 <IoCallOutline />
                        </li>
                        <li>
                            <a href="mailto:ammar@gamil.com">ammar@gamil.com</a>{" "}
                            <MdMessage />
                        </li>
                          <li>
                            0997855951 <IoCallOutline />
                        </li>
                        <li>
                            <a href="mailto:ammar@gamil.com">aya@gamil.com</a>{" "}
                            <MdMessage />
                        </li>
                          <li>
                            0997587978 <IoCallOutline />
                        </li>
                      
                        <li>
                            دمشق سوريا <FaLocationDot />
                        </li>
                    </ul>
                </div>
            </div>
            <div className="end">
                <Link href="/Policy" onClick={topScroll}>
                    <h1>جميع الحقوق محفوظة 2025 دليل البكلوريا</h1>
                </Link>
                <div>
                    <Link href="/Policy" onClick={topScroll}>
                        <span>سياسة الخصوصية</span>
                    </Link>
                    <Link href="/Policy" onClick={topScroll}>
                        <span>الشروط و الاحكام</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Footer;
