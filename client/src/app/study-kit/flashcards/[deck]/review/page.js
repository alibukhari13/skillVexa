import { notFound } from "next/navigation";
import FlashcardDeck from "@/components/FlashcardDeck";
import { flashcardDecks } from "@/config/FlashcardsData";

export function generateStaticParams() {
  return flashcardDecks.map((deck) => ({ deck: deck.id }));
}

export async function generateMetadata({ params }) {
  const { deck } = await params;
  const item = flashcardDecks.find((entry) => entry.id === deck);
  return { title: `Review ${item ? item.title : "Flashcards"} — SkillVexa` };
}

export default async function DeckReviewPage({ params }) {
  const { deck } = await params;
  if (!flashcardDecks.some((entry) => entry.id === deck)) notFound();
  return <FlashcardDeck deckId={deck} mode="review" />;
}
