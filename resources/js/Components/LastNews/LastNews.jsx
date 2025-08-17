import React from "react";
import Title from "../Title/Title";
import "./LastNews.css";

// دالة لتنسيق التاريخ
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year} / ${month} / ${day}`;
};

// الكومبوننت
const LastNews = ({ newsData }) => {
  // في حال لم ترد أخبار
  if (!newsData || newsData.length === 0) {
    return (
      <div className="LN_container">
        <Title
          title="اخر المستجدات و الاخبار"
          parg="لا توجد أخبار حالياً"
        />
      </div>
    );
  }

  return (
    <div className="LN_container">
      <Title
        title="اخر المستجدات و الاخبار"
        parg="تابع اخر التحديثات و الاخبار المتعلقة بالمفاضلات و التخصصات الجديدة"
      />
      <div className="LN_Cards">
        {newsData.map((item, idx) => {
          // رابط الصورة (تعديل حسب مسار الصور لديك)
          // لو الصور محفوظة في storage/app/public/images/
          // const imageUrl = `/storage/images/${item.image}`;

          // ستستخدم summary كملخص الخبر
          return (
            <div className="card LN_card" key={item.id || idx}>
              <div className="LN_image">
                {/* <img src={imageUrl} alt={`خبر - ${item.title}`} /> */}
                {/* اذا لديك خاصية tag في البيانات مثل 'مفاضلات'، وإلا تحذف السطر التالي */}
                {/* <div className="LN_tag">{item.tag || "خبر"}</div> */}
              </div>
              <div className="LN_Text">
                <div className="LN_InfoRow">
                  <span className="LN_university">{item.publisher}</span>
                  <span className="LN_date">{formatDate(item.publish_date)}</span>
                </div>
                <div className="LN_newsTitle">{item.title}</div>
                <p>{item.summary}</p>
              </div>
              <a href="#" className="LN_readMore">
                <span>قراءة المزيد</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  style={{ marginRight: "6px", verticalAlign: "middle" }}
                  fill="none"
                >
                  <path
                    d="M7 5l5 5-5 5"
                    stroke="#0069d9"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          );
        })}
      </div>
      <div className="LN_bottom">
        <button className="LN_btn">عرض كافة الاخبار</button>
      </div>
    </div>
  );
};

export default LastNews;
