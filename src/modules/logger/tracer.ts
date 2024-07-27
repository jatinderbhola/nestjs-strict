import tracer from 'dd-trace';

if (
  process.env.DD_TRACE_ENABLED === 'true' &&
  process.env.NODE_ENV !== undefined &&
  !process.env.NODE_ENV.match(/test/)
) {
  tracer.init(); // initialized in a different file to avoid hoisting.
}

export default tracer;
