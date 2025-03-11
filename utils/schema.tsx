import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const AIOutput=pgTable('aiOutput',{
    id:serial('id').primaryKey(),
    formData:varchar('formData').notNull(),
    aiResponse:text('aiResponse').notNull(),
    templateSlug:varchar('templateSlug'),
    createdBy:varchar('createdBy').notNull(),
    createdAt:varchar('createdAt')
})

export const Users=pgTable('users',{
    id:serial('id').primaryKey(),
    name:varchar('name').notNull(),
    email:varchar('email').notNull(),
    imageUrl:varchar('imageUrl')
})

export const Feedback = pgTable('feedback', {
    id: serial('id').primaryKey(),
    feedbackText: text('feedback_text').notNull(),
    firstName: varchar('first_name', { length: 100 }).notNull(),
    lastName: varchar('last_name', { length: 100 }).notNull(),
    mobileNo: varchar('mobile_no', { length: 15 }).notNull(),
    email: varchar('email', { length: 100 }).notNull(),
    address: text('address').notNull(),
  });
