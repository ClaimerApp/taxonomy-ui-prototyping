import { sensors } from '../../data/sensors'
import { SensorCard } from './SensorCard'

export default function SensorList() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-serif text-2xl font-bold text-nearblack">Sensors</h2>
        <p className="text-sm text-warmgrey mt-1">
          Sensors continuously monitor your data sources and detect meaningful changes
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sensors.map((sensor) => (
          <SensorCard key={sensor.id} sensor={sensor} />
        ))}
      </div>
    </div>
  )
}
