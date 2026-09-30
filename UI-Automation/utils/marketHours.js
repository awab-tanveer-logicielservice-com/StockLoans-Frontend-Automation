/**
 * US equity market hours, used to gate scenarios whose premise needs live data.
 *
 * Bulk Import only functions while the market is open: the price columns are
 * populated from live data, and outside market hours they come back empty, so
 * a row has nothing to submit. The click lands on an enabled Submit button, the
 * app makes no write, Grid 2 stays empty, and the scenario fails for a reason
 * that is neither a test defect nor an application defect.
 *
 * Confirmed by the user on 2026-09-23 after the failure was traced this far:
 * no REST submit call is made at all (the only POSTs in the window are Firestore
 * channel traffic), the Submit button is the correct one and is enabled, and
 * Grid 2 never receives rows.
 *
 * Regular session: 09:30-16:00 America/New_York, Monday to Friday.
 *
 * Caveat: market holidays are NOT handled - on Thanksgiving this reports open.
 * Adding them means maintaining a calendar; a scenario that fails on a holiday
 * fails with the market-hours note attached, which is enough to recognise it.
 * Early-close days (13:00 ET) are likewise not modelled.
 */

const OPEN_MINUTES = 9 * 60 + 30;
const CLOSE_MINUTES = 16 * 60;

export function getMarketStatus(now = new Date()) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/New_York',
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    })
      .formatToParts(now)
      .map((p) => [p.type, p.value])
  );

  const weekday = parts.weekday;
  // h23 still yields "24" for midnight in some ICU builds; normalise it.
  const hour = Number(parts.hour) % 24;
  const minute = Number(parts.minute);
  const minutes = hour * 60 + minute;

  const isWeekend = weekday === 'Sat' || weekday === 'Sun';
  const isOpen = !isWeekend && minutes >= OPEN_MINUTES && minutes < CLOSE_MINUTES;

  const timeET = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')} ET`;
  const reason = isOpen
    ? `market is open (${weekday} ${timeET})`
    : isWeekend
      ? `market is closed - ${weekday}`
      : `market is closed - ${timeET}, outside 09:30-16:00 ET`;

  return { isOpen, weekday, timeET, reason };
}
