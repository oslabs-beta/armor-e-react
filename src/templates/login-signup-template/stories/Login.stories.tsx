import type { Meta, StoryObj } from '@storybook/react';

import Login from '../components/Login/Login';

const meta = {
  component: Login,
} satisfies Meta<typeof Login>;

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
      },

      "required": false
    },

    confirmPassword: true,
    validationChecklist: true
  }
};