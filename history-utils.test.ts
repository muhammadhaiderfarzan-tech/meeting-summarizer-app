import { describe, it, expect, beforeEach, vi } from "vitest";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  saveSummaryToHistory,
  getHistory,
  deleteHistoryItem,
  clearHistory,
  type HistoryItem,
} from "../lib/history-utils";

// Mock AsyncStorage
vi.mock("@react-native-async-storage/async-storage", () => ({
  default: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  },
}));

describe("History Utils", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("saveSummaryToHistory", () => {
    it("should save a summary to history", async () => {
      const mockAsyncStorage = AsyncStorage as any;
      mockAsyncStorage.getItem.mockResolvedValue(null);
      mockAsyncStorage.setItem.mockResolvedValue(undefined);

      const transcript = "Test transcript";
      const result = {
        summary: ["Point 1", "Point 2"],
        assignments: [],
        exams: [],
        actionItems: [],
        detectedDates: [],
      };

      const savedItem = await saveSummaryToHistory(transcript, result);

      expect(savedItem).toBeDefined();
      expect(savedItem.transcript).toBe(transcript);
      expect(savedItem.result).toEqual(result);
      expect(savedItem.preview).toBe(transcript);
      expect(mockAsyncStorage.setItem).toHaveBeenCalled();
    });

    it("should prepend new items to existing history", async () => {
      const mockAsyncStorage = AsyncStorage as any;
      const existingHistory = [
        {
          id: "summary_1",
          transcript: "Old transcript",
          result: {},
          createdAt: 1000,
          preview: "Old",
        },
      ];

      mockAsyncStorage.getItem.mockResolvedValue(JSON.stringify(existingHistory));
      mockAsyncStorage.setItem.mockResolvedValue(undefined);

      const transcript = "New transcript";
      const result = { summary: [], assignments: [], exams: [], actionItems: [], detectedDates: [] };

      await saveSummaryToHistory(transcript, result);

      const callArgs = mockAsyncStorage.setItem.mock.calls[0];
      const savedData = JSON.parse(callArgs[1]);

      expect(savedData[0].transcript).toBe(transcript);
      expect(savedData[1].transcript).toBe("Old transcript");
    });

    it("should limit history to 50 items", async () => {
      const mockAsyncStorage = AsyncStorage as any;
      const largeHistory = Array.from({ length: 50 }, (_, i) => ({
        id: `summary_${i}`,
        transcript: `Transcript ${i}`,
        result: {},
        createdAt: i,
        preview: `Preview ${i}`,
      }));

      mockAsyncStorage.getItem.mockResolvedValue(JSON.stringify(largeHistory));
      mockAsyncStorage.setItem.mockResolvedValue(undefined);

      const transcript = "New transcript";
      const result = { summary: [], assignments: [], exams: [], actionItems: [], detectedDates: [] };

      await saveSummaryToHistory(transcript, result);

      const callArgs = mockAsyncStorage.setItem.mock.calls[0];
      const savedData = JSON.parse(callArgs[1]);

      expect(savedData.length).toBe(50);
    });
  });

  describe("getHistory", () => {
    it("should return empty array if no history exists", async () => {
      const mockAsyncStorage = AsyncStorage as any;
      mockAsyncStorage.getItem.mockResolvedValue(null);

      const history = await getHistory();

      expect(history).toEqual([]);
    });

    it("should return parsed history from storage", async () => {
      const mockAsyncStorage = AsyncStorage as any;
      const mockHistory = [
        {
          id: "summary_1",
          transcript: "Test",
          result: {},
          createdAt: 1000,
          preview: "Test",
        },
      ];

      mockAsyncStorage.getItem.mockResolvedValue(JSON.stringify(mockHistory));

      const history = await getHistory();

      expect(history).toEqual(mockHistory);
    });
  });

  describe("deleteHistoryItem", () => {
    it("should delete an item from history", async () => {
      const mockAsyncStorage = AsyncStorage as any;
      const mockHistory = [
        { id: "summary_1", transcript: "Test 1", result: {}, createdAt: 1000, preview: "Test 1" },
        { id: "summary_2", transcript: "Test 2", result: {}, createdAt: 2000, preview: "Test 2" },
      ];

      mockAsyncStorage.getItem.mockResolvedValue(JSON.stringify(mockHistory));
      mockAsyncStorage.setItem.mockResolvedValue(undefined);

      await deleteHistoryItem("summary_1");

      const callArgs = mockAsyncStorage.setItem.mock.calls[0];
      const savedData = JSON.parse(callArgs[1]);

      expect(savedData.length).toBe(1);
      expect(savedData[0].id).toBe("summary_2");
    });

    it("should handle deletion when no history exists", async () => {
      const mockAsyncStorage = AsyncStorage as any;
      mockAsyncStorage.getItem.mockResolvedValue(null);

      await expect(deleteHistoryItem("summary_1")).resolves.toBeUndefined();
    });
  });

  describe("clearHistory", () => {
    it("should remove all history", async () => {
      const mockAsyncStorage = AsyncStorage as any;
      mockAsyncStorage.removeItem.mockResolvedValue(undefined);

      await clearHistory();

      expect(mockAsyncStorage.removeItem).toHaveBeenCalledWith("meeting_summarizer_history");
    });
  });
});
