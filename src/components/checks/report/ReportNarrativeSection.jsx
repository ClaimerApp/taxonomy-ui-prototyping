// Renders within a shared A4Page wrapper provided by the dispatcher.
export function ReportNarrativeSection({ fieldId, heading, questions }) {
  return (
    <div>
      <h3
        data-field-id={fieldId}
        className="font-sans font-bold text-[22px] text-nearblack leading-tight mb-6"
      >
        {heading}
      </h3>
      <div className="space-y-5">
        {questions.map((q) => (
          <div key={q.id} data-field-id={q.id}>
            <h4 className="font-sans font-bold text-[14px] text-reportAccent leading-snug mb-2">
              {q.q}
            </h4>
            <div className="space-y-2.5">
              {q.body.map((para, i) => (
                <p
                  key={i}
                  className="font-serif text-[11.5px] leading-[1.55] text-charcoal/90 text-justify"
                >
                  {para}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
