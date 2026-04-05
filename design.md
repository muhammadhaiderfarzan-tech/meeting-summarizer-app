# AI Meeting Summarizer - Mobile App Design

## Design Philosophy

This mobile app is designed for **students** to quickly process lecture transcripts and meeting notes. The interface prioritizes **simplicity**, **speed**, and **clarity** to help students focus on what matters: extracting actionable insights from their notes.

**Design Principles:**
- One-handed usage (portrait orientation, 9:16 aspect ratio)
- Minimal cognitive load—clear input, organized output
- iOS-first design following Apple Human Interface Guidelines
- Fast feedback loops (instant processing feedback)
- Accessibility first (readable text, high contrast)

---

## Screen List

### 1. **Home Screen** (Tab: Home)
The main entry point where students paste or input their lecture/meeting transcript.

**Content:**
- Header: "AI Meeting Summarizer" with app icon
- Large text input area (textarea) for pasting transcripts
- "Summarize" button (primary action)
- Quick access to recent summaries (list of past inputs)
- Sample transcript button (for demo/testing)

**Functionality:**
- Accept text input (paste from notes app, email, etc.)
- Validate input (warn if empty)
- Show loading state during processing
- Navigate to Results screen on success

### 2. **Results Screen**
Displays the AI-generated analysis with four sections: Summary, Assignments, Exams, and Action Items.

**Content:**
- Scrollable view with four collapsible/tabbed sections:
  - **Summary**: Bullet-point overview
  - **Assignments**: List of tasks with due dates
  - **Exams**: Upcoming exams/tests with prep notes
  - **Action Items**: Prioritized to-dos (High/Med/Low)
- Back button to return to Home
- Save/Download button
- Share button

**Functionality:**
- Display structured JSON/markdown output from LLM
- Copy individual sections to clipboard
- Save result to local history
- Export as CSV or text

### 3. **History Screen** (Tab: History)
View and manage past summaries.

**Content:**
- List of saved summaries (timestamp, preview text)
- Search/filter by date or keywords
- Delete option for each item
- Tap to view full result

**Functionality:**
- Load from local storage (AsyncStorage)
- Quick re-view of past analyses
- Delete old entries

### 4. **Settings Screen** (Tab: Settings)
Configure app preferences and API keys.

**Content:**
- API Key input (for OpenAI or alternative LLM)
- Theme toggle (Light/Dark mode)
- About section
- Privacy/Terms links

**Functionality:**
- Securely store API key (use expo-secure-store)
- Toggle dark mode
- Display app version

---

## Primary Content and Functionality

### Home Screen (Detailed)

**Layout:**
```
┌─────────────────────────────────┐
│  AI Meeting Summarizer          │
│  🎓                             │
├─────────────────────────────────┤
│ Paste your lecture/meeting      │
│ transcript below:               │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ [Text Input Area]           │ │
│ │ (Height: ~40% of screen)    │ │
│ │                             │ │
│ │                             │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │  📝 Summarize & Extract     │ │
│ │  (Primary Button)           │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │  📋 Load Sample Transcript  │ │
│ │  (Secondary Button)         │ │
│ └─────────────────────────────┘ │
│                                 │
│ Recent Summaries:               │
│ • [Today 2:30 PM] CS101 Lec... │
│ • [Yesterday] Meeting Notes...  │
│                                 │
└─────────────────────────────────┘
```

### Results Screen (Detailed)

**Layout (Tabbed View):**
```
┌─────────────────────────────────┐
│  < Results                      │
├─────────────────────────────────┤
│ [Summary] [Assignments]         │
│ [Exams]   [Actions]             │
├─────────────────────────────────┤
│                                 │
│ 📄 Summary                      │
│ ─────────────────────────────── │
│ • Key topic 1                   │
│ • Key topic 2                   │
│ • Key topic 3                   │
│                                 │
│ [Copy] [Share]                  │
│                                 │
├─────────────────────────────────┤
│ 💾 Save Result                  │
│ 📥 Download as CSV              │
│                                 │
└─────────────────────────────────┘
```

### History Screen (Detailed)

**Layout:**
```
┌─────────────────────────────────┐
│  History                        │
├─────────────────────────────────┤
│ 🔍 [Search...]                  │
├─────────────────────────────────┤
│                                 │
│ Today                           │
│ ┌─────────────────────────────┐ │
│ │ 2:30 PM - CS101 Lecture     │ │
│ │ "Prof. Lee: Welcome to..." │ │
│ │                    [Delete] │ │
│ └─────────────────────────────┘ │
│                                 │
│ Yesterday                       │
│ ┌─────────────────────────────┐ │
│ │ 10:15 AM - Team Meeting     │ │
│ │ "Discussed Q2 roadmap..." │ │
│ │                    [Delete] │ │
│ └─────────────────────────────┘ │
│                                 │
│ Last Week                       │
│ ┌─────────────────────────────┐ │
│ │ Mar 28 - Biology Lab        │ │
│ │ "Lab procedure for DNA..." │ │
│ │                    [Delete] │ │
│ └─────────────────────────────┘ │
│                                 │
└─────────────────────────────────┘
```

---

## Key User Flows

### Flow 1: Summarize a Lecture (Main Flow)
1. User opens app → **Home Screen**
2. User pastes transcript into text area
3. User taps **"Summarize & Extract"** button
4. App shows loading indicator ("Processing with AI...")
5. Backend processes transcript via LLM
6. App navigates to **Results Screen**
7. User views Summary, Assignments, Exams, Action Items
8. User can copy, share, or save result
9. Result is stored in local history

### Flow 2: View Past Summary
1. User opens app → **Home Screen**
2. User taps on a recent summary in the list OR navigates to **History Screen**
3. App displays the saved result in **Results Screen**
4. User can re-export or delete

### Flow 3: Configure API Key
1. User navigates to **Settings Screen**
2. User taps "API Key" field
3. User enters their OpenAI API key (or alternative LLM key)
4. Key is securely stored (expo-secure-store)
5. User returns to Home and can now summarize

---

## Color Choices

**Brand Colors (iOS-inspired):**
- **Primary Tint**: `#0a7ea4` (Blue) — Used for buttons, links, highlights
- **Background**: `#ffffff` (Light) / `#151718` (Dark)
- **Surface**: `#f5f5f5` (Light) / `#1e2022` (Dark) — Cards, input areas
- **Foreground (Text)**: `#11181C` (Light) / `#ECEDEE` (Dark)
- **Muted (Secondary Text)**: `#687076` (Light) / `#9BA1A6` (Dark)
- **Success**: `#22C55E` (Green) — For successful operations
- **Warning**: `#F59E0B` (Amber) — For warnings/cautions
- **Error**: `#EF4444` (Red) — For errors

**Usage:**
- Buttons: Primary tint
- Text: Foreground for primary, Muted for secondary
- Backgrounds: Surface for cards, Background for screens
- Feedback: Success/Warning/Error as needed

---

## Interaction Patterns

### Loading States
- Show spinner with "Processing with AI..." text
- Disable input and button during processing
- Estimated time: 2-5 seconds (LLM response time)

### Error Handling
- Show error alert if API key is missing
- Show error alert if transcript is empty
- Show error alert if LLM processing fails
- Provide retry button

### Success Feedback
- Brief haptic feedback on button press (Light impact)
- Toast notification: "Summary saved!" after saving
- Smooth transition to Results screen

### Copy/Share Actions
- Tap "Copy" → Toast: "Copied to clipboard"
- Tap "Share" → System share sheet (iOS/Android native)

---

## Accessibility

- **Text Sizes**: Minimum 16pt for body text, 20pt+ for headers
- **Contrast**: All text meets WCAG AA standards (4.5:1 minimum)
- **Touch Targets**: All buttons ≥44pt × 44pt (iOS standard)
- **Labels**: All inputs have clear labels
- **Dark Mode**: Full support with system detection

---

## Summary

The **AI Meeting Summarizer** mobile app provides students with a fast, intuitive way to process lecture notes and extract actionable insights. The design prioritizes clarity, speed, and accessibility, with a clean interface that works seamlessly on iOS and Android devices.
