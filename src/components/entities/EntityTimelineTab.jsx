import { EntityTimeline } from './EntityTimeline'

export function EntityTimelineTab({ entity }) {
  return <EntityTimeline timeline={entity.timeline} showFilters />
}
