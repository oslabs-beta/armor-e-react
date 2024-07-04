import type { Meta, StoryObj } from '@storybook/react';

import App from '../components/Form/Form';

const meta = {
  component: App,
} satisfies Meta<typeof App>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    email: undefined,
    password: true,
    phoneNumber: false,

    username: {
      "validation": {
        "min": 6,
        "errorMessage": "'uh oh spaghetti o'"
      }
    },

    confirmPassword: undefined,
    isLogin: false
  }
};