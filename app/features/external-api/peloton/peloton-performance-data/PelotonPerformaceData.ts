export type PelotonPerformaceData = {
  duration: number;
  is_class_plan_shown: boolean;
  segment_list: SegmentList[];
  seconds_since_pedaling_start: number[];
  average_summaries: Summary[];
  summaries: Summary[];
  metrics: Metric[];
  has_apple_watch_metrics: boolean;
  location_data: any[];
  is_location_data_accurate: null;
  splits_data: any[];
  target_performance_metrics: TargetPerformanceMetrics;
  effort_zones: null;
};

export type Summary = {
  display_name: string;
  display_unit: string;
  value: number;
  slug: string;
};

export type Metric = {
  display_name: string;
  display_unit: string;
  max_value: number;
  average_value: number;
  values: number[];
  slug: string;
  zones?: Zone[];
  missing_data_duration?: number;
};

export type Zone = {
  display_name: string;
  slug: string;
  range: string;
  duration: number;
  max_value: number;
  min_value: number;
};

export type SegmentList = {
  id: string;
  length: number;
  start_time_offset: number;
  icon_url: string;
  intensity_in_mets: number;
  metrics_type: string;
  icon_name: string;
  icon_slug: string;
  name: string;
};

export type TargetPerformanceMetrics = {
  target_graph_metrics: TargetGraphMetric[];
  cadence_time_in_range: number;
  resistance_time_in_range: number;
};

export type TargetGraphMetric = {
  graph_data: GraphData;
  max: number;
  min: number;
  average: number;
  type: string;
};

export type GraphData = {
  upper: number[];
  lower: number[];
  average: number[];
};
