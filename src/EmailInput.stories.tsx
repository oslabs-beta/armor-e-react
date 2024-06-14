import type { Meta, StoryObj } from '@storybook/react';

import EmailInput from './EmailInput';

const meta = {
  component: EmailInput,
} satisfies Meta<typeof EmailInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    email: "email",
    onEmailChange: () => {}
  }
};