import { DFA, Transition } from '../types';

/**
 * Returns the transition for the given state and symbol in a DFA.
 * Since it's a DFA, there should be exactly one transition for each state-symbol pair.
 * If multiple transitions exist (due to malformed input), we sort them in natural order
 * and return the first one to maintain deterministic behavior.
 * 
 * @param dfa The DFA object
 * @param state The current state
 * @param symbol The input symbol
 * @returns The found Transition or undefined
 */
export function get_transition(dfa: DFA, state: string, symbol: string): Transition | undefined {
  const transitions = dfa.transitions.filter(
    (t) => t.from === state && t.symbol === symbol
  );

  if (transitions.length === 0) {
    return undefined;
  }

  // To ensure deterministic behavior even if the input is technically not a valid DFA
  // (e.g., multiple transitions for the same symbol), we sort them by the "to" state.
  // Use numeric collation for natural sorting (e.g., 2 comes before 10).
  return transitions.sort((a, b) =>
    a.to.localeCompare(b.to, undefined, { numeric: true })
  )[0];
}

/**
 * Simulates a DFA on a given input string.
 * 
 * @param dfa The DFA object
 * @param input The input string (sequence of symbols)
 * @returns An object containing the final state and whether it's an accepting state
 */
export function simulate_dfa(dfa: DFA, input: string[]): { finalState: string; accepted: boolean } {
  let currentState = dfa.initial_state;

  for (const symbol of input) {
    const transition = get_transition(dfa, currentState, symbol);
    if (!transition) {
      // In a strict DFA, this shouldn't happen if the alphabet is correctly defined.
      // We'll return the current state as a rejection.
      return { finalState: currentState, accepted: false };
    }
    currentState = transition.to;
  }

  return {
    finalState: currentState,
    accepted: dfa.final_states.includes(currentState),
  };
}

/**
 * Validates if the provided object is a valid DFA.
 */
export function validate_dfa(dfa: DFA): string[] {
  const errors: string[] = [];

  if (!dfa.states.includes(dfa.initial_state)) {
    errors.push(`Initial state "${dfa.initial_state}" is not in the set of states.`);
  }

  for (const state of dfa.final_states) {
    if (!dfa.states.includes(state)) {
      errors.push(`Final state "${state}" is not in the set of states.`);
    }
  }

  const transitionMap = new Map<string, Set<string>>();

  for (const t of dfa.transitions) {
    if (!dfa.states.includes(t.from)) {
      errors.push(`Transition from unknown state "${t.from}".`);
    }
    if (!dfa.states.includes(t.to)) {
      errors.push(`Transition to unknown state "${t.to}".`);
    }
    if (!dfa.alphabet.includes(t.symbol)) {
      errors.push(`Transition using unknown symbol "${t.symbol}".`);
    }

    const key = `${t.from}|${t.symbol}`;
    if (!transitionMap.has(key)) {
      transitionMap.set(key, new Set());
    }
    const targets = transitionMap.get(key)!;
    if (targets.size > 0) {
      errors.push(`Non-deterministic transition found: state "${t.from}" has multiple transitions for symbol "${t.symbol}".`);
    }
    targets.add(t.to);
  }

  // Check if every state has a transition for every symbol
  for (const state of dfa.states) {
    for (const symbol of dfa.alphabet) {
      if (!transitionMap.has(`${state}|${symbol}`)) {
        errors.push(`Missing transition for state "${state}" on symbol "${symbol}".`);
      }
    }
  }

  return errors;
}
