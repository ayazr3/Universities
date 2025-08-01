import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import '@/Components/Admin/Style/Style.css'; // تأكد من المسار الصحيح

export default function FaqEdit({ faq, auth }) {
  const { data, setData, put, processing, errors } = useForm({
    question: faq.question || '',
    answer: faq.answer || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('faq.update', faq.id), {
      preserveScroll: true,
    });
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">تعديل سؤال شائع</h2>}
    >
      <Head title="تعديل سؤال شائع" />

      <div className="py-12 flex justify-center">
        <div className="w-full max-w-lg">
          <form onSubmit={handleSubmit} className="modern-form" noValidate>
            <h2 className="form-title">تعديل السؤال الشائع</h2>

            {/* السؤال */}
            <div className="form-group">
              <label htmlFor="question">السؤال</label>
              <input
                type="text"
                id="question"
                name="question"
                value={data.question}
                onChange={e => setData('question', e.target.value)}
                className={errors.question ? "input-error" : ""}
                required
                autoFocus
              />
              {errors.question && <p className="error-text">{errors.question}</p>}
            </div>

            {/* الإجابة */}
            <div className="form-group">
              <label htmlFor="answer">الإجابة</label>
              <textarea
                id="answer"
                name="answer"
                rows="5"
                value={data.answer}
                onChange={e => setData('answer', e.target.value)}
                className={errors.answer ? "input-error" : ""}
                required
              />
              {errors.answer && <p className="error-text">{errors.answer}</p>}
            </div>

            {/* الأزرار */}
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems:'center', gap: '2rem', marginTop: 24}}>
              <button
                type="submit"
                disabled={processing}
                className="submit-btn"
                style={{ minWidth: 120 }}
              >
                {processing ? 'جاري التحديث...' : 'تحديث السؤال'}
              </button>
              <Link href={route('faq.index')} className="modern-link" style={{alignSelf: 'center'}}>
                رجوع
              </Link>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
