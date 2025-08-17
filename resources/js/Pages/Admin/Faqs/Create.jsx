import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import '@/Components/Admin/Style/Style.css';

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
    <AuthenticatedLayout user={auth.user}>
      <Head title="إضافة سؤال جديد" />

      <div
        style={{
          minHeight: "100vh",
          background: "#edf2ff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <form
          className="modern-form"
          style={{ width: '100%', maxWidth: "480px" }}
          onSubmit={handleSubmit}
        >
          <h2 className="form-title" style={{ marginBottom: 24, marginTop: 0, fontSize: "26px" }}>
            إدخال الأسئلة الشائعة
          </h2>

          {/* حقل السؤال */}
          <div className="form-group">
            <label htmlFor="question">السؤال</label>
            <input
              type="text"
              id="question"
              value={data.question}
              onChange={e => setData('question', e.target.value)}
              required
              className={errors.question ? "input-error" : ""}
            />
            {errors.question && <div style={{ color: "#e74c3c", fontSize: "13px" }}>{errors.question}</div>}
          </div>

          {/* حقل الإجابة */}
          <div className="form-group">
            <label htmlFor="answer">الإجابة</label>
            <textarea
              id="answer"
              rows={5}
              value={data.answer}
              onChange={e => setData('answer', e.target.value)}
              required
              className={errors.answer ? "input-error" : ""}
            />
            {errors.answer && <div style={{ color: "#e74c3c", fontSize: "13px" }}>{errors.answer}</div>}
          </div>

          {/* زر الحفظ + العودة */}
          <div style={{
            display: "flex",
            gap: "10px",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 15
          }}>
            <button
              type="submit"
              className="submit-btn"
              disabled={processing}
              style={{ flex: 1 }}
            >
              {processing ? 'جاري الحفظ...' : 'حفظ البيانات'}
            </button>
            <Link
              href={route('faq.index')}
              style={{
                color: "#3a8dde",
                textDecoration: "underline",
                background: "#eaf4ff",
                borderRadius: 8,
                padding: "10px 16px",
                fontSize: "15px",
                fontWeight: "bold",
                minWidth: "83px",
                textAlign: "center"
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
