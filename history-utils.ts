import AsyncStorage from "@react-native-async-storage/async-storage";

export interface HistoryItem {
  id: string;
  transcript: string;
  result: any;
  createdAt: number;
  preview: string;
}

const HISTORY_KEY = "meeting_summarizer_history";
const MAX_HISTORY_ITEMS = 50;

export async function saveSummaryToHistory(
  transcript: string,
  result: any
): Promise<HistoryItem> {
  try {
    const id = `summary_${Date.now()}`;
    const preview = transcript.substring(0, 100).trim();

    const newItem: HistoryItem = {
      id,
      transcript,
      result,
      createdAt: Date.now(),
      preview,
    };

    // Get existing history
    const stored = await AsyncStorage.getItem(HISTORY_KEY);
    let history: HistoryItem[] = stored ? JSON.parse(stored) : [];

    // Add new item to the beginning
    history.unshift(newItem);

    // Keep only the most recent items
    if (history.length > MAX_HISTORY_ITEMS) {
      history = history.slice(0, MAX_HISTORY_ITEMS);
    }

    // Save updated history
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history));

    return newItem;
  } catch (error) {
    console.error("Failed to save summary to history:", error);
    throw error;
  }
}

export async function getHistory(): Promise<HistoryItem[]> {
  try {
    const stored = await AsyncStorage.getItem(HISTORY_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (error) {
    console.error("Failed to get history:", error);
    return [];
  }
}

export async function deleteHistoryItem(id: string): Promise<void> {
  try {
    const stored = await AsyncStorage.getItem(HISTORY_KEY);
    if (!stored) return;

    const history: HistoryItem[] = JSON.parse(stored);
    const updated = history.filter((item) => item.id !== id);
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Failed to delete history item:", error);
    throw error;
  }
}

export async function clearHistory(): Promise<void> {
  try {
    await AsyncStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error("Failed to clear history:", error);
    throw error;
  }
}
