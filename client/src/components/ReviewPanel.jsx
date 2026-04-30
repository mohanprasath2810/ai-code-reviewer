export default function ReviewPanel({ review, loading }) {
  if (loading) return (
    <div className="flex items-center justify-center h-[450px] text-gray-400 animate-pulse">
      🤖 AI is reviewing your code...
    </div>
  );

  if (!review) return (
    <div className="flex items-center justify-center h-[450px] text-gray-500 border border-dashed border-gray-700 rounded-xl">
      Your review will appear here
    </div>
  );

  const scoreColor = review.score >= 8 ? "text-green-400"
                   : review.score >= 5 ? "text-yellow-400" : "text-red-400";

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-5 h-[500px] overflow-y-auto space-y-4">

      {/* Score */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">Review Result</h2>
        <span className={`text-3xl font-bold ${scoreColor}`}>{review.score}/10</span>
      </div>

      {/* Summary */}
      <Section title="📋 Summary" content={review.summary} />

      {/* Bugs */}
      {review.bugs?.length > 0 && (
        <ListSection title="🐛 Bugs Found" items={review.bugs} color="text-red-400" />
      )}

      {/* Improvements */}
      {review.improvements?.length > 0 && (
        <ListSection title="💡 Improvements" items={review.improvements} color="text-yellow-400" />
      )}

      {/* Best Practices */}
      {review.bestPractices?.length > 0 && (
        <ListSection title="✅ Best Practices" items={review.bestPractices} color="text-blue-400" />
      )}

      {/* Optimized Code */}
      {review.optimizedCode && (
        <div>
          <h3 className="font-semibold text-green-400 mb-2">⚡ Optimized Code</h3>
          <pre className="bg-gray-800 rounded-lg p-3 text-sm overflow-x-auto text-gray-300 whitespace-pre-wrap">
            {review.optimizedCode}
          </pre>
        </div>
      )}
    </div>
  );
}

function Section({ title, content }) {
  return (
    <div>
      <h3 className="font-semibold text-gray-300 mb-1">{title}</h3>
      <p className="text-gray-400 text-sm">{content}</p>
    </div>
  );
}

function ListSection({ title, items, color }) {
  return (
    <div>
      <h3 className={`font-semibold mb-1 ${color}`}>{title}</h3>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i} className="text-gray-400 text-sm flex gap-2">
            <span>•</span><span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}