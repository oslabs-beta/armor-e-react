import type { Meta, StoryObj } from '@storybook/react';

import UsernameInput from '../components/Username/UsernameInput';

const meta = {
  component: UsernameInput,
} satisfies Meta<typeof UsernameInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    username: "username",
    onUsernameChange: () => {}
  }
};