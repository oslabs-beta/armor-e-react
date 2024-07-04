import type { Meta, StoryObj } from '@storybook/react';

import ErrorMessage from '../components/ErrorMessage/ErrorMessage';

const meta = {
  component: ErrorMessage,
} satisfies Meta<typeof ErrorMessage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: "message"
  }
};