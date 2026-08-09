import { ARRANGING } from "@/lib/content";
import { EnquiryButton, Eyebrow, SectionHead, StatTile } from "./ui";

/**
 * The arranging block.
 *
 * Replaces the date list, deleted in v4.1 when the client confirmed there are
 * no fixed sessions. It answers Wei Ling's "when can I go?" structurally
 * rather than with data.
 *
 * The framing matters: this is presented as flexibility, not absence. For a
 * date night or a team afternoon, "name a day that suits you" is a better offer
 * than three fixed slots, and every competitor with a fixed timetable is worse
 * on that axis. But the notice period must be stated — without it a visitor
 * cannot tell whether next Saturday is possible, and that silence reads as risk.
 */
export function ArrangingBlock({
  workshopName,
  message,
  duration,
}: {
  workshopName?: string;
  message: string;
  duration?: string;
}) {
  return (
    <>
      <SectionHead
        eyebrow="Arranging a session"
        title={workshopName ? "When you like." : "You pick the day."}
        intro={
          workshopName
            ? `${workshopName} runs on request rather than on a timetable. Send us a day that suits you and we'll confirm what's possible.`
            : "There is no fixed timetable to work around. Tell us roughly when suits you — a weekend afternoon, a weekday evening — and we will set up a session for you and whoever you are bringing."
        }
      />

      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        <StatTile value="Your day" label={ARRANGING.days} />
        <StatTile value={ARRANGING.people} label="People per session" placeholder />
        <StatTile value={ARRANGING.notice} label="Typical notice" placeholder />
        {duration ? (
          <StatTile value={duration} label="Session length" placeholder />
        ) : (
          <StatTile value="All four" label="Techniques available" />
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-6 rounded-md border border-line bg-card p-6">
        <div className="grid gap-1.5">
          <b className="text-heading">
            {workshopName ? "Tell us two things" : "Message us with a day that works."}
          </b>
          <span className="text-body-s text-moss">
            {workshopName
              ? "Roughly when — a date, or even just a weekend. And how many of you."
              : "Tell us which workshop and roughly when. We reply with what's possible."}
          </span>
          {workshopName ? <Eyebrow>We usually reply within a few hours</Eyebrow> : null}
        </div>
        <EnquiryButton message={message}>
          {workshopName ? `WhatsApp about ${workshopName}` : "WhatsApp us"}
        </EnquiryButton>
      </div>
    </>
  );
}
