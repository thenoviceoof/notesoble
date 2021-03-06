/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex
%%

[\+]                  return 'NEWLINE'
[\ \t]+               return 'SPACE'
\w+                   return 'WORD'
<<EOF>>               return 'EOF'

/lex

/* operator associations and precedence */

/* %left NEWLINES */

%start expressions

%% /* language grammar */

expressions
    : e EOF {return $1;}
  ;

newlines
    : NEWLINE NEWLINE
        { $$ = $1+$2; }
    | newlines NEWLINE
        { $$ = $1+$2; }
  ;

paragraph
    : WORD
        { $$ = $1; }
    | paragraph WORD
        { $$ = $1+$2; }
    | paragraph SPACE
        { $$ = $1+$2; }
  ;

e
    : paragraph
        { $$ = $1; }
    | e NEWLINE e
        { $$ = $1+$2+$3; }
    | e newlines e
        { $$ = $1+$2+"NEWLINES"+$3; }
  ;
