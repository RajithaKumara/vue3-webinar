import { ref, inject, watchEffect } from "vue";
import type { Ref } from "vue";

export interface DateFormatOptions {
  dateFormatOptions: Ref<Intl.DateTimeFormatOptions>;
  updateDateFormatOptions: (options: Intl.DateTimeFormatOptions) => void;
}

export default function useDateFormat() {
  const date: Ref<Date | null> = ref(null);
  const formattedDate: Ref<string | null> = ref(null);

  const dateFormatOptions = inject<DateFormatOptions>("dateFormatOptions");

  watchEffect(() => {
    if (date.value) {
      formattedDate.value = date.value.toLocaleDateString(
        "en-US",
        dateFormatOptions?.dateFormatOptions.value
      );
    } else {
      formattedDate.value = null;
    }
  });

  return {
    date,
    formattedDate,
  };
}
