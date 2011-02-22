/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex
%%

[\n]                  return 'NEWLINE'
[\ \t]+               return 'SPACE'
\w+                   return 'WORD'
<<EOF>>               return 'EOF'

/lex

/* operator associations and precedence */

%start expressions

%% /* language grammar */

expressions
    : /* empty */
    | e EOF {return $1;}
  ;

PARAGRAPH
    : WORD
        {$$ = $1;}
    | SPACE
        {$$ = $1;}
    | PARAGRAPH WORD
        {$$ = $1+$2;}
    | PARAGRAPH SPACE
        {$$ = $1+$2;}
    | PARAGRAPH NEWLINE WORD
        {$$ = $1+$2+$3;}
    | PARAGRAPH NEWLINE SPACE
        {$$ = $1+$2+$3;}
  ;

NEWLINES
    : NEWLINE NEWLINE
        {alert(); $$ = $1+$2;}
    | NEWLINES NEWLINE
        {$$ = $1+$2;}
  ;

e
    : PARAGRAPH
        {$$ = "<p>"+$1+"</p>";}
    | e NEWLINES
        {$$ = $1+$2+$3;}
    ;
























/* WHATTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT */

/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex
%%

\s+                   return 'WHITESPACE'
\n+                   return 'NEWLINES'
[0-9]+("."[0-9]+)?\b  return 'NUMBER'
"\w+"                 return 'WORD'
=+                    return 'HEADER'
"**"                  return 'BOLD'
"//"                  return 'ITALICS'
"\\\\"                return 'PAGEBREAK'
"[["                  return 'BEGINLINK'
"]]"                  return 'ENDLINK'
<<EOF>>               return 'EOF'
\r                    /* Like hell we want this */

/lex

/* operator associations and precedence */

/* %left UMINUS */

%start expressions

%% /* language grammar */

expressions
    : e EOF
        {return $1;}
    ;

e
    : WORD PARAGRAPH
        {$$ = $1+$3;}
    | e '-' e
        {$$ = $1-$3;}
    | e '*' e
        {$$ = $1*$3;}
    | e '/' e
        {$$ = $1/$3;}
    | e '^' e
        {$$ = Math.pow($1, $3);}
    | '-' e %prec UMINUS
        {$$ = -$2;}
    | '(' e ')'
        {$$ = $2;}
    | NUMBER
        {$$ = Number(yytext);}
    | E
        {$$ = Math.E;}
    | PI
        {$$ = Math.PI;}
    ;
