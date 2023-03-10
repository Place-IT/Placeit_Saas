import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from '../features/UserAuth/AuthSlicer';
import CompanySlicer from "../features/company/CompanySlicer";
import DialogSlice from "../features/dialogSlicer";
import StudentSlice from "../features/Department/StudentSLicer";
import FeedSlice from "../features/timeline/Timelineslicer";

export const store = configureStore({
  reducer: {
    Auth: AuthSlice,
    Dialog:DialogSlice,
    Feed:FeedSlice,
    Student:StudentSlice,
    Company:CompanySlicer,
  },
});
