#include <stdio.h>
#include <string.h>

int main()
{
    char notes[25];
    char note = 'a';

    for (int i = 1; i < 9; i++)
    {
        note = 'a';
        for (int j = 0; j < 12; j++)
        {
            sprintf(notes, "audio/%d-%c.wav", i, note);
            printf("'%s', ", notes);
            if (strcmp(notes, "8-cs.wav") == 0)
            {
                break;
            }

            if (note == 'a' || note == 'c' || note == 'd' || note == 'f' || note == 'g')
            {
                sprintf(notes, "audio/%d-%cs.wav", i, note);

                printf("'%s', ", notes);
                j++;
            }

            note++;
            if (note > 'g')
            {
                note = 'a';
            }
        }
        printf("\n");
    }

    return 0;
}
