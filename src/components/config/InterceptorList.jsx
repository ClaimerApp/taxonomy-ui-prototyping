import { interceptors } from '../../data/interceptors'
import { InterceptorCard } from './InterceptorCard'

export default function InterceptorList() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-serif text-2xl font-bold text-nearblack">Interceptors</h2>
        <p className="text-sm text-warmgrey mt-1">
          Interceptors perform real-time checks within your workflows before actions are completed
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {interceptors.map((interceptor) => (
          <InterceptorCard key={interceptor.id} interceptor={interceptor} />
        ))}
      </div>
    </div>
  )
}
