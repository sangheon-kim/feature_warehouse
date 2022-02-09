export const GA_TRACKING_ID = "G-MZ9HSNJQN0";

//developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  (window as any).gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  [key: string]: any;
}) => {
  (window as Window & { [key: string]: any }).gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
