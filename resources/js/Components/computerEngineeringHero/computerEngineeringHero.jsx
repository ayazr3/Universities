const ComputerEngineeringHero = ({ specialization, college }) => {
  // استخدم بيانات التخصص المستلمة بدل المعلومات الثابتة
  return (
    <section className="ce-hero">
      <header className="ce-navbar">
        <nav className="ce-navlinks">
          <a href="/TheFirsts" className="ce-link">اوائل الكلية</a>
          {/* يمكن تعديل قائمة المشاريع حسب البيانات */}
        </nav>
      </header>
      <div className="ce-content">
        <div className="ce-title-row">
          <span className="ce-icon ce-icon-left">{"<>"}</span>
          <h1 className="ce-titlee">{specialization?.name || "..."}</h1>
          <span className="ce-icon ce-icon-right">🧠</span>
        </div>
        <div className="ce-subtitle">{college?.name || "..."}</div>
        <div className="ce-tags">
          <span className="ce-tag ce-tag-lightning">{specialization.degree_type}</span>
          <span className="ce-tag">بكالوريوس</span>
          <span className="ce-tag">{specialization.academic_year_number} سنوات</span>
        </div>
        <div className="ce-scroll-indicator">
          <span className="ce-scroll-dot"></span>
        </div>
      </div>
    </section>
  );
};

export default ComputerEngineeringHero;
