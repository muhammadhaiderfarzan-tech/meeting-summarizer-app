# AI Meeting Summarizer - Project TODO

## Core Features

### Phase 1: Home Screen & Transcript Input
- [x] Create Home screen component with text input area
- [x] Implement transcript text input (textarea)
- [x] Add "Summarize & Extract" primary button
- [x] Add "Load Sample Transcript" secondary button
- [x] Display loading state during processing
- [x] Validate input (warn if empty)

### Phase 2: LLM Integration & Results Processing
- [x] Set up OpenAI API integration (or alternative LLM)
- [x] Implement LLM prompts for:
  - [x] Summary extraction (bullet points)
  - [x] Assignment extraction (with due dates)
  - [x] Exam reminder detection (with dates)
  - [x] Action item highlighting (with priorities)
- [x] Create Results screen component
- [x] Display Summary section with formatted output
- [x] Display Assignments section (JSON/list format)
- [x] Display Exams section with detected dates
- [x] Display Action Items section with priorities

### Phase 3: Results Display & Interactions
- [x] Implement tabbed/collapsible view for four result sections
- [x] Add copy-to-clipboard functionality for each section
- [x] Add share functionality (system share sheet)
- [x] Add back button to return to Home
- [x] Implement save result to local storage

### Phase 4: History & Local Storage
- [x] Create History screen component
- [x] Implement AsyncStorage for saving summaries
- [x] Display list of past summaries with timestamps
- [x] Add search/filter by date or keywords
- [x] Add delete functionality for history items
- [x] Tap to view full result from history

### Phase 5: Settings & Configuration
- [x] Create Settings screen component
- [x] Implement theme toggle (Light/Dark mode)
- [x] Add About section with app version
- [x] Add Privacy/Terms links

### Phase 6: UI Polish & Refinement
- [x] Implement error handling and error messages
- [x] Add loading indicators and spinners
- [x] Test dark mode support
- [x] Ensure responsive layout on different screen sizes

### Phase 7: Branding & Icons
- [x] Generate custom app logo/icon
- [x] Update app.config.ts with app name and branding
- [x] Set up splash screen
- [x] Configure Android adaptive icon
- [x] Set favicon for web

### Phase 8: Testing & Delivery
- [ ] Test core flows end-to-end
- [ ] Test on iOS and Android (Expo Go)
- [ ] Test error handling and edge cases
- [ ] Verify API key storage and retrieval
- [ ] Test history save/load functionality
- [ ] Create checkpoint for delivery

## Optional Enhancements (Post-MVP)
- [ ] Audio upload + Whisper transcription
- [ ] Calendar integration (Google/Outlook reminders)
- [ ] Multi-language support
- [ ] Local LLM support (Ollama)
- [ ] Export to Notion/Obsidian
- [ ] Cloud sync with user accounts
