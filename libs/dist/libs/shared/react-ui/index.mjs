import { jsx as b } from 'react/jsx-runtime';
import * as y from 'react';
import 'react-dom';
function he(e, r) {
  if (typeof e == 'function') return e(r);
  e != null && (e.current = r);
}
function Be(...e) {
  return (r) => {
    let t = !1;
    const o = e.map((n) => {
      const s = he(n, r);
      return (!t && typeof s == 'function' && (t = !0), s);
    });
    if (t)
      return () => {
        for (let n = 0; n < o.length; n++) {
          const s = o[n];
          typeof s == 'function' ? s() : he(e[n], null);
        }
      };
  };
}
// @__NO_SIDE_EFFECTS__
function Se(e) {
  const r = /* @__PURE__ */ De(e),
    t = y.forwardRef((o, n) => {
      const { children: s, ...l } = o,
        m = y.Children.toArray(s),
        d = m.find(He);
      if (d) {
        const f = d.props.children,
          g = m.map((x) =>
            x === d
              ? y.Children.count(f) > 1
                ? y.Children.only(null)
                : y.isValidElement(f)
                  ? f.props.children
                  : null
              : x,
          );
        return /* @__PURE__ */ b(r, {
          ...l,
          ref: n,
          children: y.isValidElement(f) ? y.cloneElement(f, void 0, g) : null,
        });
      }
      return /* @__PURE__ */ b(r, { ...l, ref: n, children: s });
    });
  return ((t.displayName = `${e}.Slot`), t);
}
var Ae = /* @__PURE__ */ Se('Slot');
// @__NO_SIDE_EFFECTS__
function De(e) {
  const r = y.forwardRef((t, o) => {
    const { children: n, ...s } = t;
    if (y.isValidElement(n)) {
      const l = Je(n),
        m = qe(s, n.props);
      return (
        n.type !== y.Fragment && (m.ref = o ? Be(o, l) : l),
        y.cloneElement(n, m)
      );
    }
    return y.Children.count(n) > 1 ? y.Children.only(null) : null;
  });
  return ((r.displayName = `${e}.SlotClone`), r);
}
var Ue = Symbol('radix.slottable');
function He(e) {
  return (
    y.isValidElement(e) &&
    typeof e.type == 'function' &&
    '__radixId' in e.type &&
    e.type.__radixId === Ue
  );
}
function qe(e, r) {
  const t = { ...r };
  for (const o in r) {
    const n = e[o],
      s = r[o];
    /^on[A-Z]/.test(o)
      ? n && s
        ? (t[o] = (...m) => {
            const d = s(...m);
            return (n(...m), d);
          })
        : n && (t[o] = n)
      : o === 'style'
        ? (t[o] = { ...n, ...s })
        : o === 'className' && (t[o] = [n, s].filter(Boolean).join(' '));
  }
  return { ...e, ...t };
}
function Je(e) {
  var o, n;
  let r =
      (o = Object.getOwnPropertyDescriptor(e.props, 'ref')) == null
        ? void 0
        : o.get,
    t = r && 'isReactWarning' in r && r.isReactWarning;
  return t
    ? e.ref
    : ((r =
        (n = Object.getOwnPropertyDescriptor(e, 'ref')) == null
          ? void 0
          : n.get),
      (t = r && 'isReactWarning' in r && r.isReactWarning),
      t ? e.props.ref : e.props.ref || e.ref);
}
function Ne(e) {
  var r,
    t,
    o = '';
  if (typeof e == 'string' || typeof e == 'number') o += e;
  else if (typeof e == 'object')
    if (Array.isArray(e)) {
      var n = e.length;
      for (r = 0; r < n; r++)
        e[r] && (t = Ne(e[r])) && (o && (o += ' '), (o += t));
    } else for (t in e) e[t] && (o && (o += ' '), (o += t));
  return o;
}
function Re() {
  for (var e, r, t = 0, o = '', n = arguments.length; t < n; t++)
    (e = arguments[t]) && (r = Ne(e)) && (o && (o += ' '), (o += r));
  return o;
}
const ve = (e) => (typeof e == 'boolean' ? `${e}` : e === 0 ? '0' : e),
  xe = Re,
  Pe = (e, r) => (t) => {
    var o;
    if ((r == null ? void 0 : r.variants) == null)
      return xe(
        e,
        t == null ? void 0 : t.class,
        t == null ? void 0 : t.className,
      );
    const { variants: n, defaultVariants: s } = r,
      l = Object.keys(n).map((f) => {
        const g = t == null ? void 0 : t[f],
          x = s == null ? void 0 : s[f];
        if (g === null) return null;
        const A = ve(g) || ve(x);
        return n[f][A];
      }),
      m =
        t &&
        Object.entries(t).reduce((f, g) => {
          let [x, A] = g;
          return (A === void 0 || (f[x] = A), f);
        }, {}),
      d =
        r == null || (o = r.compoundVariants) === null || o === void 0
          ? void 0
          : o.reduce((f, g) => {
              let { class: x, className: A, ...E } = g;
              return Object.entries(E).every((k) => {
                let [C, N] = k;
                return Array.isArray(N)
                  ? N.includes(
                      {
                        ...s,
                        ...m,
                      }[C],
                    )
                  : {
                      ...s,
                      ...m,
                    }[C] === N;
              })
                ? [...f, x, A]
                : f;
            }, []);
    return xe(
      e,
      l,
      d,
      t == null ? void 0 : t.class,
      t == null ? void 0 : t.className,
    );
  },
  le = '-',
  Ke = (e) => {
    const r = Ze(e),
      { conflictingClassGroups: t, conflictingClassGroupModifiers: o } = e;
    return {
      getClassGroupId: (l) => {
        const m = l.split(le);
        return (m[0] === '' && m.length !== 1 && m.shift(), Me(m, r) || Xe(l));
      },
      getConflictingClassGroupIds: (l, m) => {
        const d = t[l] || [];
        return m && o[l] ? [...d, ...o[l]] : d;
      },
    };
  },
  Me = (e, r) => {
    var l;
    if (e.length === 0) return r.classGroupId;
    const t = e[0],
      o = r.nextPart.get(t),
      n = o ? Me(e.slice(1), o) : void 0;
    if (n) return n;
    if (r.validators.length === 0) return;
    const s = e.join(le);
    return (l = r.validators.find(({ validator: m }) => m(s))) == null
      ? void 0
      : l.classGroupId;
  },
  ye = /^\[(.+)\]$/,
  Xe = (e) => {
    if (ye.test(e)) {
      const r = ye.exec(e)[1],
        t = r == null ? void 0 : r.substring(0, r.indexOf(':'));
      if (t) return 'arbitrary..' + t;
    }
  },
  Ze = (e) => {
    const { theme: r, classGroups: t } = e,
      o = {
        nextPart: /* @__PURE__ */ new Map(),
        validators: [],
      };
    for (const n in t) se(t[n], o, n, r);
    return o;
  },
  se = (e, r, t, o) => {
    e.forEach((n) => {
      if (typeof n == 'string') {
        const s = n === '' ? r : we(r, n);
        s.classGroupId = t;
        return;
      }
      if (typeof n == 'function') {
        if (Qe(n)) {
          se(n(o), r, t, o);
          return;
        }
        r.validators.push({
          validator: n,
          classGroupId: t,
        });
        return;
      }
      Object.entries(n).forEach(([s, l]) => {
        se(l, we(r, s), t, o);
      });
    });
  },
  we = (e, r) => {
    let t = e;
    return (
      r.split(le).forEach((o) => {
        (t.nextPart.has(o) ||
          t.nextPart.set(o, {
            nextPart: /* @__PURE__ */ new Map(),
            validators: [],
          }),
          (t = t.nextPart.get(o)));
      }),
      t
    );
  },
  Qe = (e) => e.isThemeGetter,
  Ye = (e) => {
    if (e < 1)
      return {
        get: () => {},
        set: () => {},
      };
    let r = 0,
      t = /* @__PURE__ */ new Map(),
      o = /* @__PURE__ */ new Map();
    const n = (s, l) => {
      (t.set(s, l),
        r++,
        r > e && ((r = 0), (o = t), (t = /* @__PURE__ */ new Map())));
    };
    return {
      get(s) {
        let l = t.get(s);
        if (l !== void 0) return l;
        if ((l = o.get(s)) !== void 0) return (n(s, l), l);
      },
      set(s, l) {
        t.has(s) ? t.set(s, l) : n(s, l);
      },
    };
  },
  ae = '!',
  ie = ':',
  er = ie.length,
  rr = (e) => {
    const { prefix: r, experimentalParseClassName: t } = e;
    let o = (n) => {
      const s = [];
      let l = 0,
        m = 0,
        d = 0,
        f;
      for (let k = 0; k < n.length; k++) {
        let C = n[k];
        if (l === 0 && m === 0) {
          if (C === ie) {
            (s.push(n.slice(d, k)), (d = k + er));
            continue;
          }
          if (C === '/') {
            f = k;
            continue;
          }
        }
        C === '[' ? l++ : C === ']' ? l-- : C === '(' ? m++ : C === ')' && m--;
      }
      const g = s.length === 0 ? n : n.substring(d),
        x = tr(g),
        A = x !== g,
        E = f && f > d ? f - d : void 0;
      return {
        modifiers: s,
        hasImportantModifier: A,
        baseClassName: x,
        maybePostfixModifierPosition: E,
      };
    };
    if (r) {
      const n = r + ie,
        s = o;
      o = (l) =>
        l.startsWith(n)
          ? s(l.substring(n.length))
          : {
              isExternal: !0,
              modifiers: [],
              hasImportantModifier: !1,
              baseClassName: l,
              maybePostfixModifierPosition: void 0,
            };
    }
    if (t) {
      const n = o;
      o = (s) =>
        t({
          className: s,
          parseClassName: n,
        });
    }
    return o;
  },
  tr = (e) =>
    e.endsWith(ae)
      ? e.substring(0, e.length - 1)
      : e.startsWith(ae)
        ? e.substring(1)
        : e,
  or = (e) => {
    const r = Object.fromEntries(e.orderSensitiveModifiers.map((o) => [o, !0]));
    return (o) => {
      if (o.length <= 1) return o;
      const n = [];
      let s = [];
      return (
        o.forEach((l) => {
          l[0] === '[' || r[l] ? (n.push(...s.sort(), l), (s = [])) : s.push(l);
        }),
        n.push(...s.sort()),
        n
      );
    };
  },
  nr = (e) => ({
    cache: Ye(e.cacheSize),
    parseClassName: rr(e),
    sortModifiers: or(e),
    ...Ke(e),
  }),
  sr = /\s+/,
  ar = (e, r) => {
    const {
        parseClassName: t,
        getClassGroupId: o,
        getConflictingClassGroupIds: n,
        sortModifiers: s,
      } = r,
      l = [],
      m = e.trim().split(sr);
    let d = '';
    for (let f = m.length - 1; f >= 0; f -= 1) {
      const g = m[f],
        {
          isExternal: x,
          modifiers: A,
          hasImportantModifier: E,
          baseClassName: k,
          maybePostfixModifierPosition: C,
        } = t(g);
      if (x) {
        d = g + (d.length > 0 ? ' ' + d : d);
        continue;
      }
      let N = !!C,
        T = o(N ? k.substring(0, C) : k);
      if (!T) {
        if (!N) {
          d = g + (d.length > 0 ? ' ' + d : d);
          continue;
        }
        if (((T = o(k)), !T)) {
          d = g + (d.length > 0 ? ' ' + d : d);
          continue;
        }
        N = !1;
      }
      const H = s(A).join(':'),
        B = E ? H + ae : H,
        j = B + T;
      if (l.includes(j)) continue;
      l.push(j);
      const L = n(T, N);
      for (let V = 0; V < L.length; ++V) {
        const D = L[V];
        l.push(B + D);
      }
      d = g + (d.length > 0 ? ' ' + d : d);
    }
    return d;
  };
function ir() {
  let e = 0,
    r,
    t,
    o = '';
  for (; e < arguments.length; )
    (r = arguments[e++]) && (t = Ie(r)) && (o && (o += ' '), (o += t));
  return o;
}
const Ie = (e) => {
  if (typeof e == 'string') return e;
  let r,
    t = '';
  for (let o = 0; o < e.length; o++)
    e[o] && (r = Ie(e[o])) && (t && (t += ' '), (t += r));
  return t;
};
function lr(e, ...r) {
  let t,
    o,
    n,
    s = l;
  function l(d) {
    const f = r.reduce((g, x) => x(g), e());
    return ((t = nr(f)), (o = t.cache.get), (n = t.cache.set), (s = m), m(d));
  }
  function m(d) {
    const f = o(d);
    if (f) return f;
    const g = ar(d, t);
    return (n(d, g), g);
  }
  return function () {
    return s(ir.apply(null, arguments));
  };
}
const h = (e) => {
    const r = (t) => t[e] || [];
    return ((r.isThemeGetter = !0), r);
  },
  Ee = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
  Te = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
  cr = /^\d+\/\d+$/,
  dr = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  ur =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  mr = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,
  pr = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  fr =
    /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  $ = (e) => cr.test(e),
  p = (e) => !!e && !Number.isNaN(Number(e)),
  I = (e) => !!e && Number.isInteger(Number(e)),
  oe = (e) => e.endsWith('%') && p(e.slice(0, -1)),
  M = (e) => dr.test(e),
  gr = () => !0,
  br = (e) =>
    // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
    // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
    // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
    ur.test(e) && !mr.test(e),
  Ve = () => !1,
  hr = (e) => pr.test(e),
  vr = (e) => fr.test(e),
  xr = (e) => !a(e) && !i(e),
  yr = (e) => F(e, je, Ve),
  a = (e) => Ee.test(e),
  O = (e) => F(e, Le, br),
  ne = (e) => F(e, Sr, p),
  ke = (e) => F(e, Ge, Ve),
  wr = (e) => F(e, Oe, vr),
  Q = (e) => F(e, _e, hr),
  i = (e) => Te.test(e),
  U = (e) => W(e, Le),
  kr = (e) => W(e, Ar),
  Ce = (e) => W(e, Ge),
  Cr = (e) => W(e, je),
  zr = (e) => W(e, Oe),
  Y = (e) => W(e, _e, !0),
  F = (e, r, t) => {
    const o = Ee.exec(e);
    return o ? (o[1] ? r(o[1]) : t(o[2])) : !1;
  },
  W = (e, r, t = !1) => {
    const o = Te.exec(e);
    return o ? (o[1] ? r(o[1]) : t) : !1;
  },
  Ge = (e) => e === 'position' || e === 'percentage',
  Oe = (e) => e === 'image' || e === 'url',
  je = (e) => e === 'length' || e === 'size' || e === 'bg-size',
  Le = (e) => e === 'length',
  Sr = (e) => e === 'number',
  Ar = (e) => e === 'family-name',
  _e = (e) => e === 'shadow',
  Nr = () => {
    const e = h('color'),
      r = h('font'),
      t = h('text'),
      o = h('font-weight'),
      n = h('tracking'),
      s = h('leading'),
      l = h('breakpoint'),
      m = h('container'),
      d = h('spacing'),
      f = h('radius'),
      g = h('shadow'),
      x = h('inset-shadow'),
      A = h('text-shadow'),
      E = h('drop-shadow'),
      k = h('blur'),
      C = h('perspective'),
      N = h('aspect'),
      T = h('ease'),
      H = h('animate'),
      B = () => [
        'auto',
        'avoid',
        'all',
        'avoid-page',
        'page',
        'left',
        'right',
        'column',
      ],
      j = () => [
        'center',
        'top',
        'bottom',
        'left',
        'right',
        'top-left',
        // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
        'left-top',
        'top-right',
        // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
        'right-top',
        'bottom-right',
        // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
        'right-bottom',
        'bottom-left',
        // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
        'left-bottom',
      ],
      L = () => [...j(), i, a],
      V = () => ['auto', 'hidden', 'clip', 'visible', 'scroll'],
      D = () => ['auto', 'contain', 'none'],
      u = () => [i, a, d],
      R = () => [$, 'full', 'auto', ...u()],
      ce = () => [I, 'none', 'subgrid', i, a],
      de = () => [
        'auto',
        {
          span: ['full', I, i, a],
        },
        I,
        i,
        a,
      ],
      q = () => [I, 'auto', i, a],
      ue = () => ['auto', 'min', 'max', 'fr', i, a],
      ee = () => [
        'start',
        'end',
        'center',
        'between',
        'around',
        'evenly',
        'stretch',
        'baseline',
        'center-safe',
        'end-safe',
      ],
      _ = () => [
        'start',
        'end',
        'center',
        'stretch',
        'center-safe',
        'end-safe',
      ],
      P = () => ['auto', ...u()],
      G = () => [
        $,
        'auto',
        'full',
        'dvw',
        'dvh',
        'lvw',
        'lvh',
        'svw',
        'svh',
        'min',
        'max',
        'fit',
        ...u(),
      ],
      c = () => [e, i, a],
      me = () => [
        ...j(),
        Ce,
        ke,
        {
          position: [i, a],
        },
      ],
      pe = () => [
        'no-repeat',
        {
          repeat: ['', 'x', 'y', 'space', 'round'],
        },
      ],
      fe = () => [
        'auto',
        'cover',
        'contain',
        Cr,
        yr,
        {
          size: [i, a],
        },
      ],
      re = () => [oe, U, O],
      w = () => [
        // Deprecated since Tailwind CSS v4.0.0
        '',
        'none',
        'full',
        f,
        i,
        a,
      ],
      z = () => ['', p, U, O],
      J = () => ['solid', 'dashed', 'dotted', 'double'],
      ge = () => [
        'normal',
        'multiply',
        'screen',
        'overlay',
        'darken',
        'lighten',
        'color-dodge',
        'color-burn',
        'hard-light',
        'soft-light',
        'difference',
        'exclusion',
        'hue',
        'saturation',
        'color',
        'luminosity',
      ],
      v = () => [p, oe, Ce, ke],
      be = () => [
        // Deprecated since Tailwind CSS v4.0.0
        '',
        'none',
        k,
        i,
        a,
      ],
      K = () => ['none', p, i, a],
      X = () => ['none', p, i, a],
      te = () => [p, i, a],
      Z = () => [$, 'full', ...u()];
    return {
      cacheSize: 500,
      theme: {
        animate: ['spin', 'ping', 'pulse', 'bounce'],
        aspect: ['video'],
        blur: [M],
        breakpoint: [M],
        color: [gr],
        container: [M],
        'drop-shadow': [M],
        ease: ['in', 'out', 'in-out'],
        font: [xr],
        'font-weight': [
          'thin',
          'extralight',
          'light',
          'normal',
          'medium',
          'semibold',
          'bold',
          'extrabold',
          'black',
        ],
        'inset-shadow': [M],
        leading: ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose'],
        perspective: [
          'dramatic',
          'near',
          'normal',
          'midrange',
          'distant',
          'none',
        ],
        radius: [M],
        shadow: [M],
        spacing: ['px', p],
        text: [M],
        'text-shadow': [M],
        tracking: ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest'],
      },
      classGroups: {
        // --------------
        // --- Layout ---
        // --------------
        /**
         * Aspect Ratio
         * @see https://tailwindcss.com/docs/aspect-ratio
         */
        aspect: [
          {
            aspect: ['auto', 'square', $, a, i, N],
          },
        ],
        /**
         * Container
         * @see https://tailwindcss.com/docs/container
         * @deprecated since Tailwind CSS v4.0.0
         */
        container: ['container'],
        /**
         * Columns
         * @see https://tailwindcss.com/docs/columns
         */
        columns: [
          {
            columns: [p, a, i, m],
          },
        ],
        /**
         * Break After
         * @see https://tailwindcss.com/docs/break-after
         */
        'break-after': [
          {
            'break-after': B(),
          },
        ],
        /**
         * Break Before
         * @see https://tailwindcss.com/docs/break-before
         */
        'break-before': [
          {
            'break-before': B(),
          },
        ],
        /**
         * Break Inside
         * @see https://tailwindcss.com/docs/break-inside
         */
        'break-inside': [
          {
            'break-inside': ['auto', 'avoid', 'avoid-page', 'avoid-column'],
          },
        ],
        /**
         * Box Decoration Break
         * @see https://tailwindcss.com/docs/box-decoration-break
         */
        'box-decoration': [
          {
            'box-decoration': ['slice', 'clone'],
          },
        ],
        /**
         * Box Sizing
         * @see https://tailwindcss.com/docs/box-sizing
         */
        box: [
          {
            box: ['border', 'content'],
          },
        ],
        /**
         * Display
         * @see https://tailwindcss.com/docs/display
         */
        display: [
          'block',
          'inline-block',
          'inline',
          'flex',
          'inline-flex',
          'table',
          'inline-table',
          'table-caption',
          'table-cell',
          'table-column',
          'table-column-group',
          'table-footer-group',
          'table-header-group',
          'table-row-group',
          'table-row',
          'flow-root',
          'grid',
          'inline-grid',
          'contents',
          'list-item',
          'hidden',
        ],
        /**
         * Screen Reader Only
         * @see https://tailwindcss.com/docs/display#screen-reader-only
         */
        sr: ['sr-only', 'not-sr-only'],
        /**
         * Floats
         * @see https://tailwindcss.com/docs/float
         */
        float: [
          {
            float: ['right', 'left', 'none', 'start', 'end'],
          },
        ],
        /**
         * Clear
         * @see https://tailwindcss.com/docs/clear
         */
        clear: [
          {
            clear: ['left', 'right', 'both', 'none', 'start', 'end'],
          },
        ],
        /**
         * Isolation
         * @see https://tailwindcss.com/docs/isolation
         */
        isolation: ['isolate', 'isolation-auto'],
        /**
         * Object Fit
         * @see https://tailwindcss.com/docs/object-fit
         */
        'object-fit': [
          {
            object: ['contain', 'cover', 'fill', 'none', 'scale-down'],
          },
        ],
        /**
         * Object Position
         * @see https://tailwindcss.com/docs/object-position
         */
        'object-position': [
          {
            object: L(),
          },
        ],
        /**
         * Overflow
         * @see https://tailwindcss.com/docs/overflow
         */
        overflow: [
          {
            overflow: V(),
          },
        ],
        /**
         * Overflow X
         * @see https://tailwindcss.com/docs/overflow
         */
        'overflow-x': [
          {
            'overflow-x': V(),
          },
        ],
        /**
         * Overflow Y
         * @see https://tailwindcss.com/docs/overflow
         */
        'overflow-y': [
          {
            'overflow-y': V(),
          },
        ],
        /**
         * Overscroll Behavior
         * @see https://tailwindcss.com/docs/overscroll-behavior
         */
        overscroll: [
          {
            overscroll: D(),
          },
        ],
        /**
         * Overscroll Behavior X
         * @see https://tailwindcss.com/docs/overscroll-behavior
         */
        'overscroll-x': [
          {
            'overscroll-x': D(),
          },
        ],
        /**
         * Overscroll Behavior Y
         * @see https://tailwindcss.com/docs/overscroll-behavior
         */
        'overscroll-y': [
          {
            'overscroll-y': D(),
          },
        ],
        /**
         * Position
         * @see https://tailwindcss.com/docs/position
         */
        position: ['static', 'fixed', 'absolute', 'relative', 'sticky'],
        /**
         * Top / Right / Bottom / Left
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        inset: [
          {
            inset: R(),
          },
        ],
        /**
         * Right / Left
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        'inset-x': [
          {
            'inset-x': R(),
          },
        ],
        /**
         * Top / Bottom
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        'inset-y': [
          {
            'inset-y': R(),
          },
        ],
        /**
         * Start
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        start: [
          {
            start: R(),
          },
        ],
        /**
         * End
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        end: [
          {
            end: R(),
          },
        ],
        /**
         * Top
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        top: [
          {
            top: R(),
          },
        ],
        /**
         * Right
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        right: [
          {
            right: R(),
          },
        ],
        /**
         * Bottom
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        bottom: [
          {
            bottom: R(),
          },
        ],
        /**
         * Left
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        left: [
          {
            left: R(),
          },
        ],
        /**
         * Visibility
         * @see https://tailwindcss.com/docs/visibility
         */
        visibility: ['visible', 'invisible', 'collapse'],
        /**
         * Z-Index
         * @see https://tailwindcss.com/docs/z-index
         */
        z: [
          {
            z: [I, 'auto', i, a],
          },
        ],
        // ------------------------
        // --- Flexbox and Grid ---
        // ------------------------
        /**
         * Flex Basis
         * @see https://tailwindcss.com/docs/flex-basis
         */
        basis: [
          {
            basis: [$, 'full', 'auto', m, ...u()],
          },
        ],
        /**
         * Flex Direction
         * @see https://tailwindcss.com/docs/flex-direction
         */
        'flex-direction': [
          {
            flex: ['row', 'row-reverse', 'col', 'col-reverse'],
          },
        ],
        /**
         * Flex Wrap
         * @see https://tailwindcss.com/docs/flex-wrap
         */
        'flex-wrap': [
          {
            flex: ['nowrap', 'wrap', 'wrap-reverse'],
          },
        ],
        /**
         * Flex
         * @see https://tailwindcss.com/docs/flex
         */
        flex: [
          {
            flex: [p, $, 'auto', 'initial', 'none', a],
          },
        ],
        /**
         * Flex Grow
         * @see https://tailwindcss.com/docs/flex-grow
         */
        grow: [
          {
            grow: ['', p, i, a],
          },
        ],
        /**
         * Flex Shrink
         * @see https://tailwindcss.com/docs/flex-shrink
         */
        shrink: [
          {
            shrink: ['', p, i, a],
          },
        ],
        /**
         * Order
         * @see https://tailwindcss.com/docs/order
         */
        order: [
          {
            order: [I, 'first', 'last', 'none', i, a],
          },
        ],
        /**
         * Grid Template Columns
         * @see https://tailwindcss.com/docs/grid-template-columns
         */
        'grid-cols': [
          {
            'grid-cols': ce(),
          },
        ],
        /**
         * Grid Column Start / End
         * @see https://tailwindcss.com/docs/grid-column
         */
        'col-start-end': [
          {
            col: de(),
          },
        ],
        /**
         * Grid Column Start
         * @see https://tailwindcss.com/docs/grid-column
         */
        'col-start': [
          {
            'col-start': q(),
          },
        ],
        /**
         * Grid Column End
         * @see https://tailwindcss.com/docs/grid-column
         */
        'col-end': [
          {
            'col-end': q(),
          },
        ],
        /**
         * Grid Template Rows
         * @see https://tailwindcss.com/docs/grid-template-rows
         */
        'grid-rows': [
          {
            'grid-rows': ce(),
          },
        ],
        /**
         * Grid Row Start / End
         * @see https://tailwindcss.com/docs/grid-row
         */
        'row-start-end': [
          {
            row: de(),
          },
        ],
        /**
         * Grid Row Start
         * @see https://tailwindcss.com/docs/grid-row
         */
        'row-start': [
          {
            'row-start': q(),
          },
        ],
        /**
         * Grid Row End
         * @see https://tailwindcss.com/docs/grid-row
         */
        'row-end': [
          {
            'row-end': q(),
          },
        ],
        /**
         * Grid Auto Flow
         * @see https://tailwindcss.com/docs/grid-auto-flow
         */
        'grid-flow': [
          {
            'grid-flow': ['row', 'col', 'dense', 'row-dense', 'col-dense'],
          },
        ],
        /**
         * Grid Auto Columns
         * @see https://tailwindcss.com/docs/grid-auto-columns
         */
        'auto-cols': [
          {
            'auto-cols': ue(),
          },
        ],
        /**
         * Grid Auto Rows
         * @see https://tailwindcss.com/docs/grid-auto-rows
         */
        'auto-rows': [
          {
            'auto-rows': ue(),
          },
        ],
        /**
         * Gap
         * @see https://tailwindcss.com/docs/gap
         */
        gap: [
          {
            gap: u(),
          },
        ],
        /**
         * Gap X
         * @see https://tailwindcss.com/docs/gap
         */
        'gap-x': [
          {
            'gap-x': u(),
          },
        ],
        /**
         * Gap Y
         * @see https://tailwindcss.com/docs/gap
         */
        'gap-y': [
          {
            'gap-y': u(),
          },
        ],
        /**
         * Justify Content
         * @see https://tailwindcss.com/docs/justify-content
         */
        'justify-content': [
          {
            justify: [...ee(), 'normal'],
          },
        ],
        /**
         * Justify Items
         * @see https://tailwindcss.com/docs/justify-items
         */
        'justify-items': [
          {
            'justify-items': [..._(), 'normal'],
          },
        ],
        /**
         * Justify Self
         * @see https://tailwindcss.com/docs/justify-self
         */
        'justify-self': [
          {
            'justify-self': ['auto', ..._()],
          },
        ],
        /**
         * Align Content
         * @see https://tailwindcss.com/docs/align-content
         */
        'align-content': [
          {
            content: ['normal', ...ee()],
          },
        ],
        /**
         * Align Items
         * @see https://tailwindcss.com/docs/align-items
         */
        'align-items': [
          {
            items: [
              ..._(),
              {
                baseline: ['', 'last'],
              },
            ],
          },
        ],
        /**
         * Align Self
         * @see https://tailwindcss.com/docs/align-self
         */
        'align-self': [
          {
            self: [
              'auto',
              ..._(),
              {
                baseline: ['', 'last'],
              },
            ],
          },
        ],
        /**
         * Place Content
         * @see https://tailwindcss.com/docs/place-content
         */
        'place-content': [
          {
            'place-content': ee(),
          },
        ],
        /**
         * Place Items
         * @see https://tailwindcss.com/docs/place-items
         */
        'place-items': [
          {
            'place-items': [..._(), 'baseline'],
          },
        ],
        /**
         * Place Self
         * @see https://tailwindcss.com/docs/place-self
         */
        'place-self': [
          {
            'place-self': ['auto', ..._()],
          },
        ],
        // Spacing
        /**
         * Padding
         * @see https://tailwindcss.com/docs/padding
         */
        p: [
          {
            p: u(),
          },
        ],
        /**
         * Padding X
         * @see https://tailwindcss.com/docs/padding
         */
        px: [
          {
            px: u(),
          },
        ],
        /**
         * Padding Y
         * @see https://tailwindcss.com/docs/padding
         */
        py: [
          {
            py: u(),
          },
        ],
        /**
         * Padding Start
         * @see https://tailwindcss.com/docs/padding
         */
        ps: [
          {
            ps: u(),
          },
        ],
        /**
         * Padding End
         * @see https://tailwindcss.com/docs/padding
         */
        pe: [
          {
            pe: u(),
          },
        ],
        /**
         * Padding Top
         * @see https://tailwindcss.com/docs/padding
         */
        pt: [
          {
            pt: u(),
          },
        ],
        /**
         * Padding Right
         * @see https://tailwindcss.com/docs/padding
         */
        pr: [
          {
            pr: u(),
          },
        ],
        /**
         * Padding Bottom
         * @see https://tailwindcss.com/docs/padding
         */
        pb: [
          {
            pb: u(),
          },
        ],
        /**
         * Padding Left
         * @see https://tailwindcss.com/docs/padding
         */
        pl: [
          {
            pl: u(),
          },
        ],
        /**
         * Margin
         * @see https://tailwindcss.com/docs/margin
         */
        m: [
          {
            m: P(),
          },
        ],
        /**
         * Margin X
         * @see https://tailwindcss.com/docs/margin
         */
        mx: [
          {
            mx: P(),
          },
        ],
        /**
         * Margin Y
         * @see https://tailwindcss.com/docs/margin
         */
        my: [
          {
            my: P(),
          },
        ],
        /**
         * Margin Start
         * @see https://tailwindcss.com/docs/margin
         */
        ms: [
          {
            ms: P(),
          },
        ],
        /**
         * Margin End
         * @see https://tailwindcss.com/docs/margin
         */
        me: [
          {
            me: P(),
          },
        ],
        /**
         * Margin Top
         * @see https://tailwindcss.com/docs/margin
         */
        mt: [
          {
            mt: P(),
          },
        ],
        /**
         * Margin Right
         * @see https://tailwindcss.com/docs/margin
         */
        mr: [
          {
            mr: P(),
          },
        ],
        /**
         * Margin Bottom
         * @see https://tailwindcss.com/docs/margin
         */
        mb: [
          {
            mb: P(),
          },
        ],
        /**
         * Margin Left
         * @see https://tailwindcss.com/docs/margin
         */
        ml: [
          {
            ml: P(),
          },
        ],
        /**
         * Space Between X
         * @see https://tailwindcss.com/docs/margin#adding-space-between-children
         */
        'space-x': [
          {
            'space-x': u(),
          },
        ],
        /**
         * Space Between X Reverse
         * @see https://tailwindcss.com/docs/margin#adding-space-between-children
         */
        'space-x-reverse': ['space-x-reverse'],
        /**
         * Space Between Y
         * @see https://tailwindcss.com/docs/margin#adding-space-between-children
         */
        'space-y': [
          {
            'space-y': u(),
          },
        ],
        /**
         * Space Between Y Reverse
         * @see https://tailwindcss.com/docs/margin#adding-space-between-children
         */
        'space-y-reverse': ['space-y-reverse'],
        // --------------
        // --- Sizing ---
        // --------------
        /**
         * Size
         * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
         */
        size: [
          {
            size: G(),
          },
        ],
        /**
         * Width
         * @see https://tailwindcss.com/docs/width
         */
        w: [
          {
            w: [m, 'screen', ...G()],
          },
        ],
        /**
         * Min-Width
         * @see https://tailwindcss.com/docs/min-width
         */
        'min-w': [
          {
            'min-w': [
              m,
              'screen',
              /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
              'none',
              ...G(),
            ],
          },
        ],
        /**
         * Max-Width
         * @see https://tailwindcss.com/docs/max-width
         */
        'max-w': [
          {
            'max-w': [
              m,
              'screen',
              'none',
              /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
              'prose',
              /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
              {
                screen: [l],
              },
              ...G(),
            ],
          },
        ],
        /**
         * Height
         * @see https://tailwindcss.com/docs/height
         */
        h: [
          {
            h: ['screen', 'lh', ...G()],
          },
        ],
        /**
         * Min-Height
         * @see https://tailwindcss.com/docs/min-height
         */
        'min-h': [
          {
            'min-h': ['screen', 'lh', 'none', ...G()],
          },
        ],
        /**
         * Max-Height
         * @see https://tailwindcss.com/docs/max-height
         */
        'max-h': [
          {
            'max-h': ['screen', 'lh', ...G()],
          },
        ],
        // ------------------
        // --- Typography ---
        // ------------------
        /**
         * Font Size
         * @see https://tailwindcss.com/docs/font-size
         */
        'font-size': [
          {
            text: ['base', t, U, O],
          },
        ],
        /**
         * Font Smoothing
         * @see https://tailwindcss.com/docs/font-smoothing
         */
        'font-smoothing': ['antialiased', 'subpixel-antialiased'],
        /**
         * Font Style
         * @see https://tailwindcss.com/docs/font-style
         */
        'font-style': ['italic', 'not-italic'],
        /**
         * Font Weight
         * @see https://tailwindcss.com/docs/font-weight
         */
        'font-weight': [
          {
            font: [o, i, ne],
          },
        ],
        /**
         * Font Stretch
         * @see https://tailwindcss.com/docs/font-stretch
         */
        'font-stretch': [
          {
            'font-stretch': [
              'ultra-condensed',
              'extra-condensed',
              'condensed',
              'semi-condensed',
              'normal',
              'semi-expanded',
              'expanded',
              'extra-expanded',
              'ultra-expanded',
              oe,
              a,
            ],
          },
        ],
        /**
         * Font Family
         * @see https://tailwindcss.com/docs/font-family
         */
        'font-family': [
          {
            font: [kr, a, r],
          },
        ],
        /**
         * Font Variant Numeric
         * @see https://tailwindcss.com/docs/font-variant-numeric
         */
        'fvn-normal': ['normal-nums'],
        /**
         * Font Variant Numeric
         * @see https://tailwindcss.com/docs/font-variant-numeric
         */
        'fvn-ordinal': ['ordinal'],
        /**
         * Font Variant Numeric
         * @see https://tailwindcss.com/docs/font-variant-numeric
         */
        'fvn-slashed-zero': ['slashed-zero'],
        /**
         * Font Variant Numeric
         * @see https://tailwindcss.com/docs/font-variant-numeric
         */
        'fvn-figure': ['lining-nums', 'oldstyle-nums'],
        /**
         * Font Variant Numeric
         * @see https://tailwindcss.com/docs/font-variant-numeric
         */
        'fvn-spacing': ['proportional-nums', 'tabular-nums'],
        /**
         * Font Variant Numeric
         * @see https://tailwindcss.com/docs/font-variant-numeric
         */
        'fvn-fraction': ['diagonal-fractions', 'stacked-fractions'],
        /**
         * Letter Spacing
         * @see https://tailwindcss.com/docs/letter-spacing
         */
        tracking: [
          {
            tracking: [n, i, a],
          },
        ],
        /**
         * Line Clamp
         * @see https://tailwindcss.com/docs/line-clamp
         */
        'line-clamp': [
          {
            'line-clamp': [p, 'none', i, ne],
          },
        ],
        /**
         * Line Height
         * @see https://tailwindcss.com/docs/line-height
         */
        leading: [
          {
            leading: [
              /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
              s,
              ...u(),
            ],
          },
        ],
        /**
         * List Style Image
         * @see https://tailwindcss.com/docs/list-style-image
         */
        'list-image': [
          {
            'list-image': ['none', i, a],
          },
        ],
        /**
         * List Style Position
         * @see https://tailwindcss.com/docs/list-style-position
         */
        'list-style-position': [
          {
            list: ['inside', 'outside'],
          },
        ],
        /**
         * List Style Type
         * @see https://tailwindcss.com/docs/list-style-type
         */
        'list-style-type': [
          {
            list: ['disc', 'decimal', 'none', i, a],
          },
        ],
        /**
         * Text Alignment
         * @see https://tailwindcss.com/docs/text-align
         */
        'text-alignment': [
          {
            text: ['left', 'center', 'right', 'justify', 'start', 'end'],
          },
        ],
        /**
         * Placeholder Color
         * @deprecated since Tailwind CSS v3.0.0
         * @see https://v3.tailwindcss.com/docs/placeholder-color
         */
        'placeholder-color': [
          {
            placeholder: c(),
          },
        ],
        /**
         * Text Color
         * @see https://tailwindcss.com/docs/text-color
         */
        'text-color': [
          {
            text: c(),
          },
        ],
        /**
         * Text Decoration
         * @see https://tailwindcss.com/docs/text-decoration
         */
        'text-decoration': [
          'underline',
          'overline',
          'line-through',
          'no-underline',
        ],
        /**
         * Text Decoration Style
         * @see https://tailwindcss.com/docs/text-decoration-style
         */
        'text-decoration-style': [
          {
            decoration: [...J(), 'wavy'],
          },
        ],
        /**
         * Text Decoration Thickness
         * @see https://tailwindcss.com/docs/text-decoration-thickness
         */
        'text-decoration-thickness': [
          {
            decoration: [p, 'from-font', 'auto', i, O],
          },
        ],
        /**
         * Text Decoration Color
         * @see https://tailwindcss.com/docs/text-decoration-color
         */
        'text-decoration-color': [
          {
            decoration: c(),
          },
        ],
        /**
         * Text Underline Offset
         * @see https://tailwindcss.com/docs/text-underline-offset
         */
        'underline-offset': [
          {
            'underline-offset': [p, 'auto', i, a],
          },
        ],
        /**
         * Text Transform
         * @see https://tailwindcss.com/docs/text-transform
         */
        'text-transform': [
          'uppercase',
          'lowercase',
          'capitalize',
          'normal-case',
        ],
        /**
         * Text Overflow
         * @see https://tailwindcss.com/docs/text-overflow
         */
        'text-overflow': ['truncate', 'text-ellipsis', 'text-clip'],
        /**
         * Text Wrap
         * @see https://tailwindcss.com/docs/text-wrap
         */
        'text-wrap': [
          {
            text: ['wrap', 'nowrap', 'balance', 'pretty'],
          },
        ],
        /**
         * Text Indent
         * @see https://tailwindcss.com/docs/text-indent
         */
        indent: [
          {
            indent: u(),
          },
        ],
        /**
         * Vertical Alignment
         * @see https://tailwindcss.com/docs/vertical-align
         */
        'vertical-align': [
          {
            align: [
              'baseline',
              'top',
              'middle',
              'bottom',
              'text-top',
              'text-bottom',
              'sub',
              'super',
              i,
              a,
            ],
          },
        ],
        /**
         * Whitespace
         * @see https://tailwindcss.com/docs/whitespace
         */
        whitespace: [
          {
            whitespace: [
              'normal',
              'nowrap',
              'pre',
              'pre-line',
              'pre-wrap',
              'break-spaces',
            ],
          },
        ],
        /**
         * Word Break
         * @see https://tailwindcss.com/docs/word-break
         */
        break: [
          {
            break: ['normal', 'words', 'all', 'keep'],
          },
        ],
        /**
         * Overflow Wrap
         * @see https://tailwindcss.com/docs/overflow-wrap
         */
        wrap: [
          {
            wrap: ['break-word', 'anywhere', 'normal'],
          },
        ],
        /**
         * Hyphens
         * @see https://tailwindcss.com/docs/hyphens
         */
        hyphens: [
          {
            hyphens: ['none', 'manual', 'auto'],
          },
        ],
        /**
         * Content
         * @see https://tailwindcss.com/docs/content
         */
        content: [
          {
            content: ['none', i, a],
          },
        ],
        // -------------------
        // --- Backgrounds ---
        // -------------------
        /**
         * Background Attachment
         * @see https://tailwindcss.com/docs/background-attachment
         */
        'bg-attachment': [
          {
            bg: ['fixed', 'local', 'scroll'],
          },
        ],
        /**
         * Background Clip
         * @see https://tailwindcss.com/docs/background-clip
         */
        'bg-clip': [
          {
            'bg-clip': ['border', 'padding', 'content', 'text'],
          },
        ],
        /**
         * Background Origin
         * @see https://tailwindcss.com/docs/background-origin
         */
        'bg-origin': [
          {
            'bg-origin': ['border', 'padding', 'content'],
          },
        ],
        /**
         * Background Position
         * @see https://tailwindcss.com/docs/background-position
         */
        'bg-position': [
          {
            bg: me(),
          },
        ],
        /**
         * Background Repeat
         * @see https://tailwindcss.com/docs/background-repeat
         */
        'bg-repeat': [
          {
            bg: pe(),
          },
        ],
        /**
         * Background Size
         * @see https://tailwindcss.com/docs/background-size
         */
        'bg-size': [
          {
            bg: fe(),
          },
        ],
        /**
         * Background Image
         * @see https://tailwindcss.com/docs/background-image
         */
        'bg-image': [
          {
            bg: [
              'none',
              {
                linear: [
                  {
                    to: ['t', 'tr', 'r', 'br', 'b', 'bl', 'l', 'tl'],
                  },
                  I,
                  i,
                  a,
                ],
                radial: ['', i, a],
                conic: [I, i, a],
              },
              zr,
              wr,
            ],
          },
        ],
        /**
         * Background Color
         * @see https://tailwindcss.com/docs/background-color
         */
        'bg-color': [
          {
            bg: c(),
          },
        ],
        /**
         * Gradient Color Stops From Position
         * @see https://tailwindcss.com/docs/gradient-color-stops
         */
        'gradient-from-pos': [
          {
            from: re(),
          },
        ],
        /**
         * Gradient Color Stops Via Position
         * @see https://tailwindcss.com/docs/gradient-color-stops
         */
        'gradient-via-pos': [
          {
            via: re(),
          },
        ],
        /**
         * Gradient Color Stops To Position
         * @see https://tailwindcss.com/docs/gradient-color-stops
         */
        'gradient-to-pos': [
          {
            to: re(),
          },
        ],
        /**
         * Gradient Color Stops From
         * @see https://tailwindcss.com/docs/gradient-color-stops
         */
        'gradient-from': [
          {
            from: c(),
          },
        ],
        /**
         * Gradient Color Stops Via
         * @see https://tailwindcss.com/docs/gradient-color-stops
         */
        'gradient-via': [
          {
            via: c(),
          },
        ],
        /**
         * Gradient Color Stops To
         * @see https://tailwindcss.com/docs/gradient-color-stops
         */
        'gradient-to': [
          {
            to: c(),
          },
        ],
        // ---------------
        // --- Borders ---
        // ---------------
        /**
         * Border Radius
         * @see https://tailwindcss.com/docs/border-radius
         */
        rounded: [
          {
            rounded: w(),
          },
        ],
        /**
         * Border Radius Start
         * @see https://tailwindcss.com/docs/border-radius
         */
        'rounded-s': [
          {
            'rounded-s': w(),
          },
        ],
        /**
         * Border Radius End
         * @see https://tailwindcss.com/docs/border-radius
         */
        'rounded-e': [
          {
            'rounded-e': w(),
          },
        ],
        /**
         * Border Radius Top
         * @see https://tailwindcss.com/docs/border-radius
         */
        'rounded-t': [
          {
            'rounded-t': w(),
          },
        ],
        /**
         * Border Radius Right
         * @see https://tailwindcss.com/docs/border-radius
         */
        'rounded-r': [
          {
            'rounded-r': w(),
          },
        ],
        /**
         * Border Radius Bottom
         * @see https://tailwindcss.com/docs/border-radius
         */
        'rounded-b': [
          {
            'rounded-b': w(),
          },
        ],
        /**
         * Border Radius Left
         * @see https://tailwindcss.com/docs/border-radius
         */
        'rounded-l': [
          {
            'rounded-l': w(),
          },
        ],
        /**
         * Border Radius Start Start
         * @see https://tailwindcss.com/docs/border-radius
         */
        'rounded-ss': [
          {
            'rounded-ss': w(),
          },
        ],
        /**
         * Border Radius Start End
         * @see https://tailwindcss.com/docs/border-radius
         */
        'rounded-se': [
          {
            'rounded-se': w(),
          },
        ],
        /**
         * Border Radius End End
         * @see https://tailwindcss.com/docs/border-radius
         */
        'rounded-ee': [
          {
            'rounded-ee': w(),
          },
        ],
        /**
         * Border Radius End Start
         * @see https://tailwindcss.com/docs/border-radius
         */
        'rounded-es': [
          {
            'rounded-es': w(),
          },
        ],
        /**
         * Border Radius Top Left
         * @see https://tailwindcss.com/docs/border-radius
         */
        'rounded-tl': [
          {
            'rounded-tl': w(),
          },
        ],
        /**
         * Border Radius Top Right
         * @see https://tailwindcss.com/docs/border-radius
         */
        'rounded-tr': [
          {
            'rounded-tr': w(),
          },
        ],
        /**
         * Border Radius Bottom Right
         * @see https://tailwindcss.com/docs/border-radius
         */
        'rounded-br': [
          {
            'rounded-br': w(),
          },
        ],
        /**
         * Border Radius Bottom Left
         * @see https://tailwindcss.com/docs/border-radius
         */
        'rounded-bl': [
          {
            'rounded-bl': w(),
          },
        ],
        /**
         * Border Width
         * @see https://tailwindcss.com/docs/border-width
         */
        'border-w': [
          {
            border: z(),
          },
        ],
        /**
         * Border Width X
         * @see https://tailwindcss.com/docs/border-width
         */
        'border-w-x': [
          {
            'border-x': z(),
          },
        ],
        /**
         * Border Width Y
         * @see https://tailwindcss.com/docs/border-width
         */
        'border-w-y': [
          {
            'border-y': z(),
          },
        ],
        /**
         * Border Width Start
         * @see https://tailwindcss.com/docs/border-width
         */
        'border-w-s': [
          {
            'border-s': z(),
          },
        ],
        /**
         * Border Width End
         * @see https://tailwindcss.com/docs/border-width
         */
        'border-w-e': [
          {
            'border-e': z(),
          },
        ],
        /**
         * Border Width Top
         * @see https://tailwindcss.com/docs/border-width
         */
        'border-w-t': [
          {
            'border-t': z(),
          },
        ],
        /**
         * Border Width Right
         * @see https://tailwindcss.com/docs/border-width
         */
        'border-w-r': [
          {
            'border-r': z(),
          },
        ],
        /**
         * Border Width Bottom
         * @see https://tailwindcss.com/docs/border-width
         */
        'border-w-b': [
          {
            'border-b': z(),
          },
        ],
        /**
         * Border Width Left
         * @see https://tailwindcss.com/docs/border-width
         */
        'border-w-l': [
          {
            'border-l': z(),
          },
        ],
        /**
         * Divide Width X
         * @see https://tailwindcss.com/docs/border-width#between-children
         */
        'divide-x': [
          {
            'divide-x': z(),
          },
        ],
        /**
         * Divide Width X Reverse
         * @see https://tailwindcss.com/docs/border-width#between-children
         */
        'divide-x-reverse': ['divide-x-reverse'],
        /**
         * Divide Width Y
         * @see https://tailwindcss.com/docs/border-width#between-children
         */
        'divide-y': [
          {
            'divide-y': z(),
          },
        ],
        /**
         * Divide Width Y Reverse
         * @see https://tailwindcss.com/docs/border-width#between-children
         */
        'divide-y-reverse': ['divide-y-reverse'],
        /**
         * Border Style
         * @see https://tailwindcss.com/docs/border-style
         */
        'border-style': [
          {
            border: [...J(), 'hidden', 'none'],
          },
        ],
        /**
         * Divide Style
         * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
         */
        'divide-style': [
          {
            divide: [...J(), 'hidden', 'none'],
          },
        ],
        /**
         * Border Color
         * @see https://tailwindcss.com/docs/border-color
         */
        'border-color': [
          {
            border: c(),
          },
        ],
        /**
         * Border Color X
         * @see https://tailwindcss.com/docs/border-color
         */
        'border-color-x': [
          {
            'border-x': c(),
          },
        ],
        /**
         * Border Color Y
         * @see https://tailwindcss.com/docs/border-color
         */
        'border-color-y': [
          {
            'border-y': c(),
          },
        ],
        /**
         * Border Color S
         * @see https://tailwindcss.com/docs/border-color
         */
        'border-color-s': [
          {
            'border-s': c(),
          },
        ],
        /**
         * Border Color E
         * @see https://tailwindcss.com/docs/border-color
         */
        'border-color-e': [
          {
            'border-e': c(),
          },
        ],
        /**
         * Border Color Top
         * @see https://tailwindcss.com/docs/border-color
         */
        'border-color-t': [
          {
            'border-t': c(),
          },
        ],
        /**
         * Border Color Right
         * @see https://tailwindcss.com/docs/border-color
         */
        'border-color-r': [
          {
            'border-r': c(),
          },
        ],
        /**
         * Border Color Bottom
         * @see https://tailwindcss.com/docs/border-color
         */
        'border-color-b': [
          {
            'border-b': c(),
          },
        ],
        /**
         * Border Color Left
         * @see https://tailwindcss.com/docs/border-color
         */
        'border-color-l': [
          {
            'border-l': c(),
          },
        ],
        /**
         * Divide Color
         * @see https://tailwindcss.com/docs/divide-color
         */
        'divide-color': [
          {
            divide: c(),
          },
        ],
        /**
         * Outline Style
         * @see https://tailwindcss.com/docs/outline-style
         */
        'outline-style': [
          {
            outline: [...J(), 'none', 'hidden'],
          },
        ],
        /**
         * Outline Offset
         * @see https://tailwindcss.com/docs/outline-offset
         */
        'outline-offset': [
          {
            'outline-offset': [p, i, a],
          },
        ],
        /**
         * Outline Width
         * @see https://tailwindcss.com/docs/outline-width
         */
        'outline-w': [
          {
            outline: ['', p, U, O],
          },
        ],
        /**
         * Outline Color
         * @see https://tailwindcss.com/docs/outline-color
         */
        'outline-color': [
          {
            outline: c(),
          },
        ],
        // ---------------
        // --- Effects ---
        // ---------------
        /**
         * Box Shadow
         * @see https://tailwindcss.com/docs/box-shadow
         */
        shadow: [
          {
            shadow: [
              // Deprecated since Tailwind CSS v4.0.0
              '',
              'none',
              g,
              Y,
              Q,
            ],
          },
        ],
        /**
         * Box Shadow Color
         * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
         */
        'shadow-color': [
          {
            shadow: c(),
          },
        ],
        /**
         * Inset Box Shadow
         * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
         */
        'inset-shadow': [
          {
            'inset-shadow': ['none', x, Y, Q],
          },
        ],
        /**
         * Inset Box Shadow Color
         * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
         */
        'inset-shadow-color': [
          {
            'inset-shadow': c(),
          },
        ],
        /**
         * Ring Width
         * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
         */
        'ring-w': [
          {
            ring: z(),
          },
        ],
        /**
         * Ring Width Inset
         * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
         * @deprecated since Tailwind CSS v4.0.0
         * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
         */
        'ring-w-inset': ['ring-inset'],
        /**
         * Ring Color
         * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
         */
        'ring-color': [
          {
            ring: c(),
          },
        ],
        /**
         * Ring Offset Width
         * @see https://v3.tailwindcss.com/docs/ring-offset-width
         * @deprecated since Tailwind CSS v4.0.0
         * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
         */
        'ring-offset-w': [
          {
            'ring-offset': [p, O],
          },
        ],
        /**
         * Ring Offset Color
         * @see https://v3.tailwindcss.com/docs/ring-offset-color
         * @deprecated since Tailwind CSS v4.0.0
         * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
         */
        'ring-offset-color': [
          {
            'ring-offset': c(),
          },
        ],
        /**
         * Inset Ring Width
         * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
         */
        'inset-ring-w': [
          {
            'inset-ring': z(),
          },
        ],
        /**
         * Inset Ring Color
         * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
         */
        'inset-ring-color': [
          {
            'inset-ring': c(),
          },
        ],
        /**
         * Text Shadow
         * @see https://tailwindcss.com/docs/text-shadow
         */
        'text-shadow': [
          {
            'text-shadow': ['none', A, Y, Q],
          },
        ],
        /**
         * Text Shadow Color
         * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
         */
        'text-shadow-color': [
          {
            'text-shadow': c(),
          },
        ],
        /**
         * Opacity
         * @see https://tailwindcss.com/docs/opacity
         */
        opacity: [
          {
            opacity: [p, i, a],
          },
        ],
        /**
         * Mix Blend Mode
         * @see https://tailwindcss.com/docs/mix-blend-mode
         */
        'mix-blend': [
          {
            'mix-blend': [...ge(), 'plus-darker', 'plus-lighter'],
          },
        ],
        /**
         * Background Blend Mode
         * @see https://tailwindcss.com/docs/background-blend-mode
         */
        'bg-blend': [
          {
            'bg-blend': ge(),
          },
        ],
        /**
         * Mask Clip
         * @see https://tailwindcss.com/docs/mask-clip
         */
        'mask-clip': [
          {
            'mask-clip': [
              'border',
              'padding',
              'content',
              'fill',
              'stroke',
              'view',
            ],
          },
          'mask-no-clip',
        ],
        /**
         * Mask Composite
         * @see https://tailwindcss.com/docs/mask-composite
         */
        'mask-composite': [
          {
            mask: ['add', 'subtract', 'intersect', 'exclude'],
          },
        ],
        /**
         * Mask Image
         * @see https://tailwindcss.com/docs/mask-image
         */
        'mask-image-linear-pos': [
          {
            'mask-linear': [p],
          },
        ],
        'mask-image-linear-from-pos': [
          {
            'mask-linear-from': v(),
          },
        ],
        'mask-image-linear-to-pos': [
          {
            'mask-linear-to': v(),
          },
        ],
        'mask-image-linear-from-color': [
          {
            'mask-linear-from': c(),
          },
        ],
        'mask-image-linear-to-color': [
          {
            'mask-linear-to': c(),
          },
        ],
        'mask-image-t-from-pos': [
          {
            'mask-t-from': v(),
          },
        ],
        'mask-image-t-to-pos': [
          {
            'mask-t-to': v(),
          },
        ],
        'mask-image-t-from-color': [
          {
            'mask-t-from': c(),
          },
        ],
        'mask-image-t-to-color': [
          {
            'mask-t-to': c(),
          },
        ],
        'mask-image-r-from-pos': [
          {
            'mask-r-from': v(),
          },
        ],
        'mask-image-r-to-pos': [
          {
            'mask-r-to': v(),
          },
        ],
        'mask-image-r-from-color': [
          {
            'mask-r-from': c(),
          },
        ],
        'mask-image-r-to-color': [
          {
            'mask-r-to': c(),
          },
        ],
        'mask-image-b-from-pos': [
          {
            'mask-b-from': v(),
          },
        ],
        'mask-image-b-to-pos': [
          {
            'mask-b-to': v(),
          },
        ],
        'mask-image-b-from-color': [
          {
            'mask-b-from': c(),
          },
        ],
        'mask-image-b-to-color': [
          {
            'mask-b-to': c(),
          },
        ],
        'mask-image-l-from-pos': [
          {
            'mask-l-from': v(),
          },
        ],
        'mask-image-l-to-pos': [
          {
            'mask-l-to': v(),
          },
        ],
        'mask-image-l-from-color': [
          {
            'mask-l-from': c(),
          },
        ],
        'mask-image-l-to-color': [
          {
            'mask-l-to': c(),
          },
        ],
        'mask-image-x-from-pos': [
          {
            'mask-x-from': v(),
          },
        ],
        'mask-image-x-to-pos': [
          {
            'mask-x-to': v(),
          },
        ],
        'mask-image-x-from-color': [
          {
            'mask-x-from': c(),
          },
        ],
        'mask-image-x-to-color': [
          {
            'mask-x-to': c(),
          },
        ],
        'mask-image-y-from-pos': [
          {
            'mask-y-from': v(),
          },
        ],
        'mask-image-y-to-pos': [
          {
            'mask-y-to': v(),
          },
        ],
        'mask-image-y-from-color': [
          {
            'mask-y-from': c(),
          },
        ],
        'mask-image-y-to-color': [
          {
            'mask-y-to': c(),
          },
        ],
        'mask-image-radial': [
          {
            'mask-radial': [i, a],
          },
        ],
        'mask-image-radial-from-pos': [
          {
            'mask-radial-from': v(),
          },
        ],
        'mask-image-radial-to-pos': [
          {
            'mask-radial-to': v(),
          },
        ],
        'mask-image-radial-from-color': [
          {
            'mask-radial-from': c(),
          },
        ],
        'mask-image-radial-to-color': [
          {
            'mask-radial-to': c(),
          },
        ],
        'mask-image-radial-shape': [
          {
            'mask-radial': ['circle', 'ellipse'],
          },
        ],
        'mask-image-radial-size': [
          {
            'mask-radial': [
              {
                closest: ['side', 'corner'],
                farthest: ['side', 'corner'],
              },
            ],
          },
        ],
        'mask-image-radial-pos': [
          {
            'mask-radial-at': j(),
          },
        ],
        'mask-image-conic-pos': [
          {
            'mask-conic': [p],
          },
        ],
        'mask-image-conic-from-pos': [
          {
            'mask-conic-from': v(),
          },
        ],
        'mask-image-conic-to-pos': [
          {
            'mask-conic-to': v(),
          },
        ],
        'mask-image-conic-from-color': [
          {
            'mask-conic-from': c(),
          },
        ],
        'mask-image-conic-to-color': [
          {
            'mask-conic-to': c(),
          },
        ],
        /**
         * Mask Mode
         * @see https://tailwindcss.com/docs/mask-mode
         */
        'mask-mode': [
          {
            mask: ['alpha', 'luminance', 'match'],
          },
        ],
        /**
         * Mask Origin
         * @see https://tailwindcss.com/docs/mask-origin
         */
        'mask-origin': [
          {
            'mask-origin': [
              'border',
              'padding',
              'content',
              'fill',
              'stroke',
              'view',
            ],
          },
        ],
        /**
         * Mask Position
         * @see https://tailwindcss.com/docs/mask-position
         */
        'mask-position': [
          {
            mask: me(),
          },
        ],
        /**
         * Mask Repeat
         * @see https://tailwindcss.com/docs/mask-repeat
         */
        'mask-repeat': [
          {
            mask: pe(),
          },
        ],
        /**
         * Mask Size
         * @see https://tailwindcss.com/docs/mask-size
         */
        'mask-size': [
          {
            mask: fe(),
          },
        ],
        /**
         * Mask Type
         * @see https://tailwindcss.com/docs/mask-type
         */
        'mask-type': [
          {
            'mask-type': ['alpha', 'luminance'],
          },
        ],
        /**
         * Mask Image
         * @see https://tailwindcss.com/docs/mask-image
         */
        'mask-image': [
          {
            mask: ['none', i, a],
          },
        ],
        // ---------------
        // --- Filters ---
        // ---------------
        /**
         * Filter
         * @see https://tailwindcss.com/docs/filter
         */
        filter: [
          {
            filter: [
              // Deprecated since Tailwind CSS v3.0.0
              '',
              'none',
              i,
              a,
            ],
          },
        ],
        /**
         * Blur
         * @see https://tailwindcss.com/docs/blur
         */
        blur: [
          {
            blur: be(),
          },
        ],
        /**
         * Brightness
         * @see https://tailwindcss.com/docs/brightness
         */
        brightness: [
          {
            brightness: [p, i, a],
          },
        ],
        /**
         * Contrast
         * @see https://tailwindcss.com/docs/contrast
         */
        contrast: [
          {
            contrast: [p, i, a],
          },
        ],
        /**
         * Drop Shadow
         * @see https://tailwindcss.com/docs/drop-shadow
         */
        'drop-shadow': [
          {
            'drop-shadow': [
              // Deprecated since Tailwind CSS v4.0.0
              '',
              'none',
              E,
              Y,
              Q,
            ],
          },
        ],
        /**
         * Drop Shadow Color
         * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
         */
        'drop-shadow-color': [
          {
            'drop-shadow': c(),
          },
        ],
        /**
         * Grayscale
         * @see https://tailwindcss.com/docs/grayscale
         */
        grayscale: [
          {
            grayscale: ['', p, i, a],
          },
        ],
        /**
         * Hue Rotate
         * @see https://tailwindcss.com/docs/hue-rotate
         */
        'hue-rotate': [
          {
            'hue-rotate': [p, i, a],
          },
        ],
        /**
         * Invert
         * @see https://tailwindcss.com/docs/invert
         */
        invert: [
          {
            invert: ['', p, i, a],
          },
        ],
        /**
         * Saturate
         * @see https://tailwindcss.com/docs/saturate
         */
        saturate: [
          {
            saturate: [p, i, a],
          },
        ],
        /**
         * Sepia
         * @see https://tailwindcss.com/docs/sepia
         */
        sepia: [
          {
            sepia: ['', p, i, a],
          },
        ],
        /**
         * Backdrop Filter
         * @see https://tailwindcss.com/docs/backdrop-filter
         */
        'backdrop-filter': [
          {
            'backdrop-filter': [
              // Deprecated since Tailwind CSS v3.0.0
              '',
              'none',
              i,
              a,
            ],
          },
        ],
        /**
         * Backdrop Blur
         * @see https://tailwindcss.com/docs/backdrop-blur
         */
        'backdrop-blur': [
          {
            'backdrop-blur': be(),
          },
        ],
        /**
         * Backdrop Brightness
         * @see https://tailwindcss.com/docs/backdrop-brightness
         */
        'backdrop-brightness': [
          {
            'backdrop-brightness': [p, i, a],
          },
        ],
        /**
         * Backdrop Contrast
         * @see https://tailwindcss.com/docs/backdrop-contrast
         */
        'backdrop-contrast': [
          {
            'backdrop-contrast': [p, i, a],
          },
        ],
        /**
         * Backdrop Grayscale
         * @see https://tailwindcss.com/docs/backdrop-grayscale
         */
        'backdrop-grayscale': [
          {
            'backdrop-grayscale': ['', p, i, a],
          },
        ],
        /**
         * Backdrop Hue Rotate
         * @see https://tailwindcss.com/docs/backdrop-hue-rotate
         */
        'backdrop-hue-rotate': [
          {
            'backdrop-hue-rotate': [p, i, a],
          },
        ],
        /**
         * Backdrop Invert
         * @see https://tailwindcss.com/docs/backdrop-invert
         */
        'backdrop-invert': [
          {
            'backdrop-invert': ['', p, i, a],
          },
        ],
        /**
         * Backdrop Opacity
         * @see https://tailwindcss.com/docs/backdrop-opacity
         */
        'backdrop-opacity': [
          {
            'backdrop-opacity': [p, i, a],
          },
        ],
        /**
         * Backdrop Saturate
         * @see https://tailwindcss.com/docs/backdrop-saturate
         */
        'backdrop-saturate': [
          {
            'backdrop-saturate': [p, i, a],
          },
        ],
        /**
         * Backdrop Sepia
         * @see https://tailwindcss.com/docs/backdrop-sepia
         */
        'backdrop-sepia': [
          {
            'backdrop-sepia': ['', p, i, a],
          },
        ],
        // --------------
        // --- Tables ---
        // --------------
        /**
         * Border Collapse
         * @see https://tailwindcss.com/docs/border-collapse
         */
        'border-collapse': [
          {
            border: ['collapse', 'separate'],
          },
        ],
        /**
         * Border Spacing
         * @see https://tailwindcss.com/docs/border-spacing
         */
        'border-spacing': [
          {
            'border-spacing': u(),
          },
        ],
        /**
         * Border Spacing X
         * @see https://tailwindcss.com/docs/border-spacing
         */
        'border-spacing-x': [
          {
            'border-spacing-x': u(),
          },
        ],
        /**
         * Border Spacing Y
         * @see https://tailwindcss.com/docs/border-spacing
         */
        'border-spacing-y': [
          {
            'border-spacing-y': u(),
          },
        ],
        /**
         * Table Layout
         * @see https://tailwindcss.com/docs/table-layout
         */
        'table-layout': [
          {
            table: ['auto', 'fixed'],
          },
        ],
        /**
         * Caption Side
         * @see https://tailwindcss.com/docs/caption-side
         */
        caption: [
          {
            caption: ['top', 'bottom'],
          },
        ],
        // ---------------------------------
        // --- Transitions and Animation ---
        // ---------------------------------
        /**
         * Transition Property
         * @see https://tailwindcss.com/docs/transition-property
         */
        transition: [
          {
            transition: [
              '',
              'all',
              'colors',
              'opacity',
              'shadow',
              'transform',
              'none',
              i,
              a,
            ],
          },
        ],
        /**
         * Transition Behavior
         * @see https://tailwindcss.com/docs/transition-behavior
         */
        'transition-behavior': [
          {
            transition: ['normal', 'discrete'],
          },
        ],
        /**
         * Transition Duration
         * @see https://tailwindcss.com/docs/transition-duration
         */
        duration: [
          {
            duration: [p, 'initial', i, a],
          },
        ],
        /**
         * Transition Timing Function
         * @see https://tailwindcss.com/docs/transition-timing-function
         */
        ease: [
          {
            ease: ['linear', 'initial', T, i, a],
          },
        ],
        /**
         * Transition Delay
         * @see https://tailwindcss.com/docs/transition-delay
         */
        delay: [
          {
            delay: [p, i, a],
          },
        ],
        /**
         * Animation
         * @see https://tailwindcss.com/docs/animation
         */
        animate: [
          {
            animate: ['none', H, i, a],
          },
        ],
        // ------------------
        // --- Transforms ---
        // ------------------
        /**
         * Backface Visibility
         * @see https://tailwindcss.com/docs/backface-visibility
         */
        backface: [
          {
            backface: ['hidden', 'visible'],
          },
        ],
        /**
         * Perspective
         * @see https://tailwindcss.com/docs/perspective
         */
        perspective: [
          {
            perspective: [C, i, a],
          },
        ],
        /**
         * Perspective Origin
         * @see https://tailwindcss.com/docs/perspective-origin
         */
        'perspective-origin': [
          {
            'perspective-origin': L(),
          },
        ],
        /**
         * Rotate
         * @see https://tailwindcss.com/docs/rotate
         */
        rotate: [
          {
            rotate: K(),
          },
        ],
        /**
         * Rotate X
         * @see https://tailwindcss.com/docs/rotate
         */
        'rotate-x': [
          {
            'rotate-x': K(),
          },
        ],
        /**
         * Rotate Y
         * @see https://tailwindcss.com/docs/rotate
         */
        'rotate-y': [
          {
            'rotate-y': K(),
          },
        ],
        /**
         * Rotate Z
         * @see https://tailwindcss.com/docs/rotate
         */
        'rotate-z': [
          {
            'rotate-z': K(),
          },
        ],
        /**
         * Scale
         * @see https://tailwindcss.com/docs/scale
         */
        scale: [
          {
            scale: X(),
          },
        ],
        /**
         * Scale X
         * @see https://tailwindcss.com/docs/scale
         */
        'scale-x': [
          {
            'scale-x': X(),
          },
        ],
        /**
         * Scale Y
         * @see https://tailwindcss.com/docs/scale
         */
        'scale-y': [
          {
            'scale-y': X(),
          },
        ],
        /**
         * Scale Z
         * @see https://tailwindcss.com/docs/scale
         */
        'scale-z': [
          {
            'scale-z': X(),
          },
        ],
        /**
         * Scale 3D
         * @see https://tailwindcss.com/docs/scale
         */
        'scale-3d': ['scale-3d'],
        /**
         * Skew
         * @see https://tailwindcss.com/docs/skew
         */
        skew: [
          {
            skew: te(),
          },
        ],
        /**
         * Skew X
         * @see https://tailwindcss.com/docs/skew
         */
        'skew-x': [
          {
            'skew-x': te(),
          },
        ],
        /**
         * Skew Y
         * @see https://tailwindcss.com/docs/skew
         */
        'skew-y': [
          {
            'skew-y': te(),
          },
        ],
        /**
         * Transform
         * @see https://tailwindcss.com/docs/transform
         */
        transform: [
          {
            transform: [i, a, '', 'none', 'gpu', 'cpu'],
          },
        ],
        /**
         * Transform Origin
         * @see https://tailwindcss.com/docs/transform-origin
         */
        'transform-origin': [
          {
            origin: L(),
          },
        ],
        /**
         * Transform Style
         * @see https://tailwindcss.com/docs/transform-style
         */
        'transform-style': [
          {
            transform: ['3d', 'flat'],
          },
        ],
        /**
         * Translate
         * @see https://tailwindcss.com/docs/translate
         */
        translate: [
          {
            translate: Z(),
          },
        ],
        /**
         * Translate X
         * @see https://tailwindcss.com/docs/translate
         */
        'translate-x': [
          {
            'translate-x': Z(),
          },
        ],
        /**
         * Translate Y
         * @see https://tailwindcss.com/docs/translate
         */
        'translate-y': [
          {
            'translate-y': Z(),
          },
        ],
        /**
         * Translate Z
         * @see https://tailwindcss.com/docs/translate
         */
        'translate-z': [
          {
            'translate-z': Z(),
          },
        ],
        /**
         * Translate None
         * @see https://tailwindcss.com/docs/translate
         */
        'translate-none': ['translate-none'],
        // ---------------------
        // --- Interactivity ---
        // ---------------------
        /**
         * Accent Color
         * @see https://tailwindcss.com/docs/accent-color
         */
        accent: [
          {
            accent: c(),
          },
        ],
        /**
         * Appearance
         * @see https://tailwindcss.com/docs/appearance
         */
        appearance: [
          {
            appearance: ['none', 'auto'],
          },
        ],
        /**
         * Caret Color
         * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
         */
        'caret-color': [
          {
            caret: c(),
          },
        ],
        /**
         * Color Scheme
         * @see https://tailwindcss.com/docs/color-scheme
         */
        'color-scheme': [
          {
            scheme: [
              'normal',
              'dark',
              'light',
              'light-dark',
              'only-dark',
              'only-light',
            ],
          },
        ],
        /**
         * Cursor
         * @see https://tailwindcss.com/docs/cursor
         */
        cursor: [
          {
            cursor: [
              'auto',
              'default',
              'pointer',
              'wait',
              'text',
              'move',
              'help',
              'not-allowed',
              'none',
              'context-menu',
              'progress',
              'cell',
              'crosshair',
              'vertical-text',
              'alias',
              'copy',
              'no-drop',
              'grab',
              'grabbing',
              'all-scroll',
              'col-resize',
              'row-resize',
              'n-resize',
              'e-resize',
              's-resize',
              'w-resize',
              'ne-resize',
              'nw-resize',
              'se-resize',
              'sw-resize',
              'ew-resize',
              'ns-resize',
              'nesw-resize',
              'nwse-resize',
              'zoom-in',
              'zoom-out',
              i,
              a,
            ],
          },
        ],
        /**
         * Field Sizing
         * @see https://tailwindcss.com/docs/field-sizing
         */
        'field-sizing': [
          {
            'field-sizing': ['fixed', 'content'],
          },
        ],
        /**
         * Pointer Events
         * @see https://tailwindcss.com/docs/pointer-events
         */
        'pointer-events': [
          {
            'pointer-events': ['auto', 'none'],
          },
        ],
        /**
         * Resize
         * @see https://tailwindcss.com/docs/resize
         */
        resize: [
          {
            resize: ['none', '', 'y', 'x'],
          },
        ],
        /**
         * Scroll Behavior
         * @see https://tailwindcss.com/docs/scroll-behavior
         */
        'scroll-behavior': [
          {
            scroll: ['auto', 'smooth'],
          },
        ],
        /**
         * Scroll Margin
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        'scroll-m': [
          {
            'scroll-m': u(),
          },
        ],
        /**
         * Scroll Margin X
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        'scroll-mx': [
          {
            'scroll-mx': u(),
          },
        ],
        /**
         * Scroll Margin Y
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        'scroll-my': [
          {
            'scroll-my': u(),
          },
        ],
        /**
         * Scroll Margin Start
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        'scroll-ms': [
          {
            'scroll-ms': u(),
          },
        ],
        /**
         * Scroll Margin End
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        'scroll-me': [
          {
            'scroll-me': u(),
          },
        ],
        /**
         * Scroll Margin Top
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        'scroll-mt': [
          {
            'scroll-mt': u(),
          },
        ],
        /**
         * Scroll Margin Right
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        'scroll-mr': [
          {
            'scroll-mr': u(),
          },
        ],
        /**
         * Scroll Margin Bottom
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        'scroll-mb': [
          {
            'scroll-mb': u(),
          },
        ],
        /**
         * Scroll Margin Left
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        'scroll-ml': [
          {
            'scroll-ml': u(),
          },
        ],
        /**
         * Scroll Padding
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        'scroll-p': [
          {
            'scroll-p': u(),
          },
        ],
        /**
         * Scroll Padding X
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        'scroll-px': [
          {
            'scroll-px': u(),
          },
        ],
        /**
         * Scroll Padding Y
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        'scroll-py': [
          {
            'scroll-py': u(),
          },
        ],
        /**
         * Scroll Padding Start
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        'scroll-ps': [
          {
            'scroll-ps': u(),
          },
        ],
        /**
         * Scroll Padding End
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        'scroll-pe': [
          {
            'scroll-pe': u(),
          },
        ],
        /**
         * Scroll Padding Top
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        'scroll-pt': [
          {
            'scroll-pt': u(),
          },
        ],
        /**
         * Scroll Padding Right
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        'scroll-pr': [
          {
            'scroll-pr': u(),
          },
        ],
        /**
         * Scroll Padding Bottom
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        'scroll-pb': [
          {
            'scroll-pb': u(),
          },
        ],
        /**
         * Scroll Padding Left
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        'scroll-pl': [
          {
            'scroll-pl': u(),
          },
        ],
        /**
         * Scroll Snap Align
         * @see https://tailwindcss.com/docs/scroll-snap-align
         */
        'snap-align': [
          {
            snap: ['start', 'end', 'center', 'align-none'],
          },
        ],
        /**
         * Scroll Snap Stop
         * @see https://tailwindcss.com/docs/scroll-snap-stop
         */
        'snap-stop': [
          {
            snap: ['normal', 'always'],
          },
        ],
        /**
         * Scroll Snap Type
         * @see https://tailwindcss.com/docs/scroll-snap-type
         */
        'snap-type': [
          {
            snap: ['none', 'x', 'y', 'both'],
          },
        ],
        /**
         * Scroll Snap Type Strictness
         * @see https://tailwindcss.com/docs/scroll-snap-type
         */
        'snap-strictness': [
          {
            snap: ['mandatory', 'proximity'],
          },
        ],
        /**
         * Touch Action
         * @see https://tailwindcss.com/docs/touch-action
         */
        touch: [
          {
            touch: ['auto', 'none', 'manipulation'],
          },
        ],
        /**
         * Touch Action X
         * @see https://tailwindcss.com/docs/touch-action
         */
        'touch-x': [
          {
            'touch-pan': ['x', 'left', 'right'],
          },
        ],
        /**
         * Touch Action Y
         * @see https://tailwindcss.com/docs/touch-action
         */
        'touch-y': [
          {
            'touch-pan': ['y', 'up', 'down'],
          },
        ],
        /**
         * Touch Action Pinch Zoom
         * @see https://tailwindcss.com/docs/touch-action
         */
        'touch-pz': ['touch-pinch-zoom'],
        /**
         * User Select
         * @see https://tailwindcss.com/docs/user-select
         */
        select: [
          {
            select: ['none', 'text', 'all', 'auto'],
          },
        ],
        /**
         * Will Change
         * @see https://tailwindcss.com/docs/will-change
         */
        'will-change': [
          {
            'will-change': ['auto', 'scroll', 'contents', 'transform', i, a],
          },
        ],
        // -----------
        // --- SVG ---
        // -----------
        /**
         * Fill
         * @see https://tailwindcss.com/docs/fill
         */
        fill: [
          {
            fill: ['none', ...c()],
          },
        ],
        /**
         * Stroke Width
         * @see https://tailwindcss.com/docs/stroke-width
         */
        'stroke-w': [
          {
            stroke: [p, U, O, ne],
          },
        ],
        /**
         * Stroke
         * @see https://tailwindcss.com/docs/stroke
         */
        stroke: [
          {
            stroke: ['none', ...c()],
          },
        ],
        // ---------------------
        // --- Accessibility ---
        // ---------------------
        /**
         * Forced Color Adjust
         * @see https://tailwindcss.com/docs/forced-color-adjust
         */
        'forced-color-adjust': [
          {
            'forced-color-adjust': ['auto', 'none'],
          },
        ],
      },
      conflictingClassGroups: {
        overflow: ['overflow-x', 'overflow-y'],
        overscroll: ['overscroll-x', 'overscroll-y'],
        inset: [
          'inset-x',
          'inset-y',
          'start',
          'end',
          'top',
          'right',
          'bottom',
          'left',
        ],
        'inset-x': ['right', 'left'],
        'inset-y': ['top', 'bottom'],
        flex: ['basis', 'grow', 'shrink'],
        gap: ['gap-x', 'gap-y'],
        p: ['px', 'py', 'ps', 'pe', 'pt', 'pr', 'pb', 'pl'],
        px: ['pr', 'pl'],
        py: ['pt', 'pb'],
        m: ['mx', 'my', 'ms', 'me', 'mt', 'mr', 'mb', 'ml'],
        mx: ['mr', 'ml'],
        my: ['mt', 'mb'],
        size: ['w', 'h'],
        'font-size': ['leading'],
        'fvn-normal': [
          'fvn-ordinal',
          'fvn-slashed-zero',
          'fvn-figure',
          'fvn-spacing',
          'fvn-fraction',
        ],
        'fvn-ordinal': ['fvn-normal'],
        'fvn-slashed-zero': ['fvn-normal'],
        'fvn-figure': ['fvn-normal'],
        'fvn-spacing': ['fvn-normal'],
        'fvn-fraction': ['fvn-normal'],
        'line-clamp': ['display', 'overflow'],
        rounded: [
          'rounded-s',
          'rounded-e',
          'rounded-t',
          'rounded-r',
          'rounded-b',
          'rounded-l',
          'rounded-ss',
          'rounded-se',
          'rounded-ee',
          'rounded-es',
          'rounded-tl',
          'rounded-tr',
          'rounded-br',
          'rounded-bl',
        ],
        'rounded-s': ['rounded-ss', 'rounded-es'],
        'rounded-e': ['rounded-se', 'rounded-ee'],
        'rounded-t': ['rounded-tl', 'rounded-tr'],
        'rounded-r': ['rounded-tr', 'rounded-br'],
        'rounded-b': ['rounded-br', 'rounded-bl'],
        'rounded-l': ['rounded-tl', 'rounded-bl'],
        'border-spacing': ['border-spacing-x', 'border-spacing-y'],
        'border-w': [
          'border-w-x',
          'border-w-y',
          'border-w-s',
          'border-w-e',
          'border-w-t',
          'border-w-r',
          'border-w-b',
          'border-w-l',
        ],
        'border-w-x': ['border-w-r', 'border-w-l'],
        'border-w-y': ['border-w-t', 'border-w-b'],
        'border-color': [
          'border-color-x',
          'border-color-y',
          'border-color-s',
          'border-color-e',
          'border-color-t',
          'border-color-r',
          'border-color-b',
          'border-color-l',
        ],
        'border-color-x': ['border-color-r', 'border-color-l'],
        'border-color-y': ['border-color-t', 'border-color-b'],
        translate: ['translate-x', 'translate-y', 'translate-none'],
        'translate-none': [
          'translate',
          'translate-x',
          'translate-y',
          'translate-z',
        ],
        'scroll-m': [
          'scroll-mx',
          'scroll-my',
          'scroll-ms',
          'scroll-me',
          'scroll-mt',
          'scroll-mr',
          'scroll-mb',
          'scroll-ml',
        ],
        'scroll-mx': ['scroll-mr', 'scroll-ml'],
        'scroll-my': ['scroll-mt', 'scroll-mb'],
        'scroll-p': [
          'scroll-px',
          'scroll-py',
          'scroll-ps',
          'scroll-pe',
          'scroll-pt',
          'scroll-pr',
          'scroll-pb',
          'scroll-pl',
        ],
        'scroll-px': ['scroll-pr', 'scroll-pl'],
        'scroll-py': ['scroll-pt', 'scroll-pb'],
        touch: ['touch-x', 'touch-y', 'touch-pz'],
        'touch-x': ['touch'],
        'touch-y': ['touch'],
        'touch-pz': ['touch'],
      },
      conflictingClassGroupModifiers: {
        'font-size': ['leading'],
      },
      orderSensitiveModifiers: [
        '*',
        '**',
        'after',
        'backdrop',
        'before',
        'details-content',
        'file',
        'first-letter',
        'first-line',
        'marker',
        'placeholder',
        'selection',
      ],
    };
  },
  Rr = /* @__PURE__ */ lr(Nr);
function S(...e) {
  return Rr(Re(e));
}
const Pr = Pe(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);
function $r({ className: e, variant: r, size: t, asChild: o = !1, ...n }) {
  return /* @__PURE__ */ b(o ? Ae : 'button', {
    'data-slot': 'button',
    className: S(Pr({ variant: r, size: t, className: e })),
    ...n,
  });
}
function Fr({ className: e, type: r, ...t }) {
  return /* @__PURE__ */ b('input', {
    type: r,
    'data-slot': 'input',
    className: S(
      'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
      'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
      e,
    ),
    ...t,
  });
}
var Mr = [
    'a',
    'button',
    'div',
    'form',
    'h2',
    'h3',
    'img',
    'input',
    'label',
    'li',
    'nav',
    'ol',
    'p',
    'select',
    'span',
    'svg',
    'ul',
  ],
  $e = Mr.reduce((e, r) => {
    const t = /* @__PURE__ */ Se(`Primitive.${r}`),
      o = y.forwardRef((n, s) => {
        const { asChild: l, ...m } = n,
          d = l ? t : r;
        return (
          typeof window < 'u' && (window[Symbol.for('radix-ui')] = !0),
          /* @__PURE__ */ b(d, { ...m, ref: s })
        );
      });
    return ((o.displayName = `Primitive.${r}`), { ...e, [r]: o });
  }, {}),
  Ir = 'Label',
  Fe = y.forwardRef((e, r) =>
    /* @__PURE__ */ b($e.label, {
      ...e,
      ref: r,
      onMouseDown: (t) => {
        var n;
        t.target.closest('button, input, select, textarea') ||
          ((n = e.onMouseDown) == null || n.call(e, t),
          !t.defaultPrevented && t.detail > 1 && t.preventDefault());
      },
    }),
  );
Fe.displayName = Ir;
var Er = Fe;
function Wr({ className: e, ...r }) {
  return /* @__PURE__ */ b(Er, {
    'data-slot': 'label',
    className: S(
      'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
      e,
    ),
    ...r,
  });
}
function Br({ className: e, ...r }) {
  return /* @__PURE__ */ b('div', {
    'data-slot': 'card',
    className: S(
      'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm',
      e,
    ),
    ...r,
  });
}
function Dr({ className: e, ...r }) {
  return /* @__PURE__ */ b('div', {
    'data-slot': 'card-header',
    className: S(
      '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
      e,
    ),
    ...r,
  });
}
function Ur({ className: e, ...r }) {
  return /* @__PURE__ */ b('div', {
    'data-slot': 'card-title',
    className: S('leading-none font-semibold', e),
    ...r,
  });
}
function Hr({ className: e, ...r }) {
  return /* @__PURE__ */ b('div', {
    'data-slot': 'card-description',
    className: S('text-muted-foreground text-sm', e),
    ...r,
  });
}
function qr({ className: e, ...r }) {
  return /* @__PURE__ */ b('div', {
    'data-slot': 'card-action',
    className: S(
      'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
      e,
    ),
    ...r,
  });
}
function Jr({ className: e, ...r }) {
  return /* @__PURE__ */ b('div', {
    'data-slot': 'card-content',
    className: S('px-6', e),
    ...r,
  });
}
function Kr({ className: e, ...r }) {
  return /* @__PURE__ */ b('div', {
    'data-slot': 'card-footer',
    className: S('flex items-center px-6 [.border-t]:pt-6', e),
    ...r,
  });
}
function Xr({ children: e }) {
  return /* @__PURE__ */ b('h1', {
    className:
      'scroll-m-20 text-4xl font-extrabold tracking-tight text-balance',
    children: e,
  });
}
function Zr({ children: e }) {
  return /* @__PURE__ */ b('p', {
    className: 'leading-7 [&:not(:first-child)]:mt-6',
    children: e,
  });
}
function Qr({ children: e }) {
  return /* @__PURE__ */ b('small', {
    className: 'text-sm leading-none',
    children: e,
  });
}
function Yr({ className: e, ...r }) {
  return /* @__PURE__ */ b('div', {
    'data-slot': 'skeleton',
    className: S('bg-accent animate-pulse rounded-md', e),
    ...r,
  });
}
const Tr = Pe(
  'inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
        destructive:
          'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);
function et({ className: e, variant: r, asChild: t = !1, ...o }) {
  return /* @__PURE__ */ b(t ? Ae : 'span', {
    'data-slot': 'badge',
    className: S(Tr({ variant: r }), e),
    ...o,
  });
}
var Vr = 'Separator',
  ze = 'horizontal',
  Gr = ['horizontal', 'vertical'],
  We = y.forwardRef((e, r) => {
    const { decorative: t, orientation: o = ze, ...n } = e,
      s = Or(o) ? o : ze,
      m = t
        ? { role: 'none' }
        : {
            'aria-orientation': s === 'vertical' ? s : void 0,
            role: 'separator',
          };
    return /* @__PURE__ */ b($e.div, {
      'data-orientation': s,
      ...m,
      ...n,
      ref: r,
    });
  });
We.displayName = Vr;
function Or(e) {
  return Gr.includes(e);
}
var jr = We;
function rt({
  className: e,
  orientation: r = 'horizontal',
  decorative: t = !0,
  ...o
}) {
  return /* @__PURE__ */ b(jr, {
    'data-slot': 'separator',
    decorative: t,
    orientation: r,
    className: S(
      'bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
      e,
    ),
    ...o,
  });
}
export {
  et as Badge,
  $r as Button,
  Br as Card,
  qr as CardAction,
  Jr as CardContent,
  Hr as CardDescription,
  Kr as CardFooter,
  Dr as CardHeader,
  Ur as CardTitle,
  Fr as Input,
  Wr as Label,
  rt as Separator,
  Yr as Skeleton,
  Xr as TypographyH1,
  Zr as TypographyP,
  Qr as TypographySmall,
  Tr as badgeVariants,
  Pr as buttonVariants,
  S as cn,
};
