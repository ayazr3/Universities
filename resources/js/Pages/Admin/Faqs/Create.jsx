
import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import '@/Components/Admin/Style/Style.css'; // تأكد أن مسار ملف الستايل صحيح

export default function FaqCreate({ auth }) {
  const { data, setData, post, processing, errors } = useForm({
    question: '',
    answer: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('faq.store'));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="form-title">إضافة سؤال جديد</h2>}
    >
      <Head title="إضافة سؤال جديد" />

      <div
        style={{
          minHeight: "100vh",
          background: "rgb(179 194 215)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <form
          className="modern-form"
          style={{ width: '100%', maxWidth: "520px" }}
          onSubmit={handleSubmit}
        >
          <h2 className="form-title" style={{ marginBottom: 16, marginTop: 0 }}>إضافة سؤال جديد</h2>

          {/* سؤال */}
          <div className="form-group">
            <label htmlFor="question">السؤال</label>
            <input
              id="question"
              type="text"
              className={errors.question ? "input-error" : ""}
              value={data.question}
              onChange={e => setData('question', e.target.value)}
              autoFocus
              required
            />
            {errors.question && <div style={{ color: "#e74c3c", fontSize: "13px" }}>{errors.question}</div>}
          </div>

          {/* إجابة */}
          <div className="form-group">
            <label htmlFor="answer">الإجابة</label>
            <textarea
              id="answer"
              rows={4}
              className={errors.answer ? "input-error" : ""}
              value={data.answer}
              onChange={e => setData('answer', e.target.value)}
              required
            />
            {errors.answer && <div style={{ color: "#e74c3c", fontSize: "13px" }}>{errors.answer}</div>}
          </div>

          {/* الأزرار */}
          <div style={{
            display: "flex",
            gap: "12px",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 10
          }}>
            <button
              className="submit-btn"
              type="submit"
              disabled={processing}
              style={{ flex: 1 }}
            >
              {processing ? 'جاري الحفظ...' : 'حفظ السؤال'}
            </button>
            <Link
              href={route('faq.index')}
              style={{
                color: "#3a8dde",
                fontWeight: "bold",
                textDecoration: "underline",
                background: "#eaf4ff",
                borderRadius: 7,
                padding: "11px 15px",
                fontSize: "15px"
              }}
            >
              رجوع
            </Link>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
