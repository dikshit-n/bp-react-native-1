import React from "react";

export const BottomTabIcon =
	({ focused: focusedStateIcon, notFocused: norFocusedStateIcon }) =>
	({ focused }): React.FC<{ focused: boolean; color: string; size: number }> =>
		focused ? focusedStateIcon : norFocusedStateIcon;
