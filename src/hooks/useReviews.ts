import { useEffect, useState } from "react";
import { supabase, isMockMode } from "@/lib/supabase";
import { reviewsSeed, type Review } from "@/data/reviews";

interface ReviewRow {
  id: string;
  year: number;
  title: string;
  title_ko: string | null;
  body: string;
  body_ko: string | null;
  eyebrow_en: string | null;
  eyebrow_ko: string | null;
  review_date: string | null;
  stat_value: string | null;
  stat_label: string | null;
  stat_label_ko: string | null;
  sort_order: number;
}

function toReview(row: ReviewRow): Review {
  return {
    id: row.id,
    year: row.year,
    title: row.title,
    eyebrowEn: row.eyebrow_en ?? "",
    eyebrowKo: row.eyebrow_ko ?? "",
    date: row.review_date ?? "",
    body: row.body,
    bodyKo: row.body_ko ?? row.body,
    sortOrder: row.sort_order,
    stat: row.stat_value
      ? {
          value: row.stat_value,
          label: row.stat_label ?? "",
          labelKo: row.stat_label_ko ?? row.stat_label ?? "",
        }
      : undefined,
  };
}

const byYearThenOrder = (a: Review, b: Review) =>
  b.year - a.year || a.sortOrder - b.sortOrder;

/**
 * Year-in-review entries for /footsteps. Falls back to the static seed in mock mode or
 * if the fetch fails, so the page never renders empty.
 */
export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>(() =>
    isMockMode ? [...reviewsSeed].sort(byYearThenOrder) : [],
  );
  const [loading, setLoading] = useState(!isMockMode);

  useEffect(() => {
    if (!supabase) return;
    let cancelled = false;

    supabase
      .from("reviews")
      .select("*")
      .eq("published", true)
      .order("year", { ascending: false })
      .order("sort_order", { ascending: true })
      .then(({ data, error }) => {
        if (cancelled) return;
        const rows = (data ?? []) as ReviewRow[];
        setReviews(
          error || rows.length === 0
            ? [...reviewsSeed].sort(byYearThenOrder)
            : rows.map(toReview),
        );
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { reviews, loading };
}

/** Reviews bucketed by year, newest year first. */
export function groupByYear(reviews: Review[]): Array<[number, Review[]]> {
  const buckets = new Map<number, Review[]>();
  for (const r of reviews) {
    const bucket = buckets.get(r.year);
    if (bucket) bucket.push(r);
    else buckets.set(r.year, [r]);
  }
  return [...buckets.entries()].sort((a, b) => b[0] - a[0]);
}
